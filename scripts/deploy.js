const hre = require("hardhat");

async function main() {
  const tokens = (n) => {
    return ethers.utils.parseEther(n.toString());
  };

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();

  await token.deployed();

  const Exchange = await hre.ethers.getContractFactory("Exchange");

  let feeAccount;
  let feePercent = 10;

  let owner;
  let addr1;
  let addr2;
  let ether;
  let user1;
  let user2;

  [owner, addr1, addr2, ether, user1, user2, feeAccount] =
    await ethers.getSigners();
  const exchange = await Exchange.deploy(feeAccount.address, feePercent);

  await exchange.deployed();

  console.log("Token deployed to:", token.address);
  console.log("Exchange deployed to:", exchange.address);

  //give token to address 1;
  await token.transferTo(addr1.address, tokens(10000), {
    from: owner.address,
  });
  console.log(
    `transfered ${tokens(10000)} to ${addr1.address} from ${owner.address}`
  );

  //user 1 deposites ether
  const transaction = await exchange
    .connect(user1)
    .depositeEther(ether.address, {
      from: user1.address,
      value: ethers.utils.parseEther("1"),
    });
  await transaction.wait();
  console.log(
    `deposited ${ethers.utils.parseEther(1)} ether from ${user1.address} `
  );

  //user 2 approve tokens
  await token.connect(user2).approve(exchange.address, tokens(10000), {
    from: user2.address,
  });
  console.log(`Approved  ${tokens(10000)} from ${user2.address} `);

  //user2 deposite tokens
  await exchange.connect(user2).depositeToken(token.address, tokens(10000), {
    from: user2.address,
  });
  console.log(`Deposite ${tokens(10000)} from ${user2.address} `);

  // User 1 makes order to get tokens
  let result;
  let orderId;
  result = await exchange
    .connect(user1)
    .makeOrder(
      token.address,
      tokens(100),
      ether.address,
      ethers.utils.parseEther(0.01),
      { from: user1.address }
    );
  console.log(`Made order from ${user1}`);

  // User 1 cancells order
  orderId = result.logs[0].args.id;
  await exchange.connect(user1).cancelOrder(orderId, { from: user1.address });
  console.log(`Cancelled order from ${user1.address}`);

  /////////////////////////////////////////////////////////////
  // Seed Filled Orders
  //

  // User 1 makes order
  result = await exchange
    .connect(user1)
    .makeOrder(
      token.address,
      tokens(100),
      ether.address,
      ethers.utils.parseEther(0.01),
      { from: user1.address }
    );
  console.log(`Made order from ${user1.address}`);

  // User 2 fills order
  orderId = result.logs[0].args.id;
  await exchange.connect(user2).fillOrder(orderId, { from: user2.address });
  console.log(`Filled order from ${user1.address}`);

  // Wait 1 second
  await wait(1);

  // User 1 makes another order
  result = await exchange
    .connect(user1)
    .makeOrder(
      token.address,
      tokens(50),
      ether.address,
      ethers.utils.parseEther(0.001),
      { from: user1.address }
    );
  console.log(`Made order from ${user1.address}`);

  // User 2 fills another order
  orderId = result.logs[0].args.id;
  await exchange.connect(user2).fillOrder(orderId, { from: user2.address });
  console.log(`Filled order from ${user1.address}`);

  // Wait 1 second
  await wait(1);

  // User 1 makes final order
  result = await exchange
    .connect(user1)
    .makeOrder(
      token.address,
      tokens(200),
      ether.address,
      ethers.utils.parseEther(0.015),
      { from: user1.address }
    );
  console.log(`Made order from ${user1.address}`);

  // User 2 fills final order
  orderId = result.logs[0].args.id;
  await exchange.connect(user2).fillOrder(orderId, { from: user2 });
  console.log(`Filled order from ${user1.address}`);

  // Wait 1 second
  await wait(1);

  /////////////////////////////////////////////////////////////
  // Seed Open Orders
  //

  // User 1 makes 10 orders
  for (let i = 1; i <= 10; i++) {
    result = await exchange
      .connect(user1)
      .makeOrder(
        token.address,
        tokens(10 * i),
        ether.address,
        ethers.utils.parseEther(0.001),
        { from: user1.address }
      );
    console.log(`Made order from ${user1.address}`);
    // Wait 1 second
    await wait(1);
  }

  // User 2 makes 10 orders
  for (let i = 1; i <= 10; i++) {
    result = await exchange
      .connect(user2)
      .makeOrder(
        ether.address,
        ethers.utils.parseEther(0.001),
        token.address,
        tokens(10 * i),
        { from: user2.address }
      );
    console.log(`Made order from ${user2.address}`);
    // Wait 1 second
    await wait(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
