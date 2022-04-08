const hre = require("hardhat");
const { ethers } = require("hardhat");
// import Web3 from "web3";
async function main() {
  // ******************************************
  const tokens = (n) => {
    return ethers.utils.parseEther(n.toString());
  };

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();

  await token.deployed();

  const Exchange = await hre.ethers.getContractFactory("Exchange");

  let feeAccount;
  let feePercent = 10;

  let sender;
  let receiver;
  let addr2;
  let ether;
  let user1;
  let user2;

  [sender, receiver, ether, feeAccount] = await hre.ethers.getSigners();

  // console.log(feeAccount);
  const exchange = await Exchange.deploy(feeAccount.address, feePercent);
  // const exchange = await Exchange.deploy();

  await exchange.deployed();
  console.log("Token deployed to:", token.address);
  console.log("Exchange deployed to:", exchange.address);

  let amount = tokens("10000"); // 10,000 tokens
  // user1 = sender.address;
  // user2 = receiver.address;
  await token.transferTo(receiver.address, amount, { from: sender.address });
  // await token.transferTo(user2.address, amount, { from: sender.address });
  console.log(
    `Transferred ${amount} tokens from ${sender.address} to ${receiver.address}`
  );

  // Set up exchange users
  user1 = sender;
  user2 = receiver;
  // User .1 Deposits Ether
  await exchange
    .connect(user1)
    .depositeEther(ether.address, { from: user1.address, value: tokens(0.05) });
  console.log(`Deposited ${amount} Ether from ${user1.address}`);

  // User 2 Approves Tokens
  amount = 5;
  await token
    .connect(user2)
    .approve(exchange.address, tokens(amount), { from: user2.address });
  console.log(`Approved ${amount} tokens from ${user2.address}`);

  // User 2 Deposits Tokens
  await exchange
    .connect(user2)
    .depositeToken(token.address, tokens(amount), { from: user2.address });
  console.log(`Deposited ${amount} tokens from ${user2.address}`);

  /////////////////////////////////////////////////////////////
  // Seed a Cancelled Order
  //

  // User 1 makes order to get tokens
  let result;
  let orderId;
  result = await exchange
    .connect(user1)
    .makeOrder(token.address, tokens(1), ether.address, tokens(0.01), {
      from: user1.address,
    });
  console.log(`Made order from ${user1.address}`);

  // User 1 cancells order
  let tx = await result.wait();
  orderId = tx.events[0].args.id;
  // orderId = result.logs[0].args.id;
  await exchange.connect(user1).cancelOrder(orderId, { from: user1.address });
  console.log(`Cancelled order from ${user1.address}`);

  /////////////////////////////////////////////////////////////
  // Seed Filled Orders
  //

  // User 1 makes order
  result = await exchange
    .connect(user1)
    .makeOrder(token.address, tokens(1), ether.address, tokens(0.01), {
      from: user1.address,
    });
  console.log(`Made order from ${user1.address}`);

  // User 2 fills order
  tx = await result.wait();
  orderId = tx.events[0].args.id;
  await exchange.connect(user2).fillOrder(orderId, { from: user2.address });
  console.log(`Filled order from ${user1.address}`);

  // Wait 1 second
  // await wait(1);

  // User 1 makes another order
  result = await exchange
    .connect(user1)
    .makeOrder(token.address, tokens(1), ether.address, tokens(0.001), {
      from: user1.address,
    });
  console.log(`Made order from ${user1.address}`);

  // User 2 fills another order
  tx = await result.wait();
  orderId = tx.events[0].args.id;
  await exchange.connect(user2).fillOrder(orderId, { from: user2.address });
  console.log(`Filled order from ${user1.address}`);

  // Wait 1 second
  // await wait(1);

  // User 1 makes final order
  result = await exchange
    .connect(user1)
    .makeOrder(token.address, tokens(1), ether.address, tokens(0.015), {
      from: user1.address,
    });
  console.log(`Made order from ${user1.address}`);

  // User 2 fills final order
  tx = await result.wait();
  orderId = tx.events[0].args.id;
  await exchange.connect(user2).fillOrder(orderId, { from: user2.address });
  console.log(`Filled order from ${user1.address}`);

  // User 1 makes 10 orders
  for (let i = 1; i <= 10; i++) {
    result = await exchange
      .connect(user1)
      .makeOrder(token.address, tokens(0.1 * i), ether.address, tokens(0.001), {
        from: user1.address,
      });
    console.log(`Made order from ${user1.address}`);
    // Wait 1 second
    // await wait(1)
  }

  // User 2 makes 10 orders
  for (let i = 1; i <= 10; i++) {
    result = await exchange
      .connect(user2)
      .makeOrder(ether.address, tokens(0.001), token.address, tokens(0.1 * i), {
        from: user2.address,
      });
    console.log(`Made order from ${user2.address}`);
    // Wait 1 second
    // await wait(1)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
