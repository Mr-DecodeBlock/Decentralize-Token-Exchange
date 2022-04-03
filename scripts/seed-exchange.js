const { ethers } = require("hardhat");
const Token = artifacts.require("Token");
const Exchange = artifacts.require("Exchange");

module.exports = async function (callback) {
  // const Token = await ethers.getContractFactory("Token");
  // const Exchange = await ethers.getContractFactory("Exchange");
  // const tokens = (n) => {
  //   return ethers.utils.parseEther(n.toString());
  // };
  const ether = (n) => {
    return new web3.utils.BN(web3.utils.toWei(n.toString(), "ether"));
  };

  const tokens = (n) => ether(n);

  const wait = (seconds) => {
    const milliseconds = seconds * 1000;
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  try {
    // Fetch accounts from wallet - these are unlocked
    const accounts = await web3.eth.getAccounts();

    // Fetch the deployed token
    const token = await Token.deployed();
    console.log("Token fetched", token.address);

    // Fetch the deployed exchange
    const exchange = await Exchange.deployed();
    console.log("Exchange fetched", exchange.address);

    // Give tokens to account[1]
    const sender = accounts[0];
    const receiver = accounts[1];
    let amount = web3.utils.toWei("10000", "ether"); // 10,000 tokens

    await token.transfer(receiver, amount, { from: sender });
    console.log(`Transferred ${amount} tokens from ${sender} to ${receiver}`);

    // Set up exchange users
    const user1 = accounts[0];
    const user2 = accounts[1];

    // User .1 Deposits Ether
    await exchange.depositEther({ from: user1, value: ether(0.1) });
    console.log(`Deposited ${amount} Ether from ${user1}`);

    // User 2 Approves Tokens
    amount = 10000;
    await token.approve(exchange.address, tokens(amount), { from: user2 });
    console.log(`Approved ${amount} tokens from ${user2}`);

    // User 2 Deposits Tokens
    await exchange.depositToken(token.address, tokens(amount), { from: user2 });
    console.log(`Deposited ${amount} tokens from ${user2}`);

    /////////////////////////////////////////////////////////////
    // Seed a Cancelled Order
    //

    // User 1 makes order to get tokens
    let result;
    let orderId;
    result = await exchange.makeOrder(
      token.address,
      tokens(100),
      ETHER_ADDRESS,
      ether(0.01),
      { from: user1 }
    );
    console.log(`Made order from ${user1}`);

    // User 1 cancells order
    orderId = result.logs[0].args.id;
    await exchange.cancelOrder(orderId, { from: user1 });
    console.log(`Cancelled order from ${user1}`);

    /////////////////////////////////////////////////////////////
    // Seed Filled Orders
    //

    // User 1 makes order
    result = await exchange.makeOrder(
      token.address,
      tokens(100),
      ETHER_ADDRESS,
      ether(0.01),
      { from: user1 }
    );
    console.log(`Made order from ${user1}`);

    // User 2 fills order
    orderId = result.logs[0].args.id;
    await exchange.fillOrder(orderId, { from: user2 });
    console.log(`Filled order from ${user1}`);

    // Wait 1 second
    await wait(1);

    // User 1 makes another order
    result = await exchange.makeOrder(
      token.address,
      tokens(50),
      ETHER_ADDRESS,
      ether(0.001),
      { from: user1 }
    );
    console.log(`Made order from ${user1}`);

    // User 2 fills another order
    orderId = result.logs[0].args.id;
    await exchange.fillOrder(orderId, { from: user2 });
    console.log(`Filled order from ${user1}`);

    // Wait 1 second
    await wait(1);

    // User 1 makes final order
    result = await exchange.makeOrder(
      token.address,
      tokens(200),
      ETHER_ADDRESS,
      ether(0.015),
      { from: user1 }
    );
    console.log(`Made order from ${user1}`);

    // User 2 fills final order
    orderId = result.logs[0].args.id;
    await exchange.fillOrder(orderId, { from: user2 });
    console.log(`Filled order from ${user1}`);

    // Wait 1 second
    await wait(1);

    /////////////////////////////////////////////////////////////
    // Seed Open Orders
    //

    // User 1 makes 10 orders
    for (let i = 1; i <= 10; i++) {
      result = await exchange.makeOrder(
        token.address,
        tokens(10 * i),
        ETHER_ADDRESS,
        ether(0.001),
        { from: user1 }
      );
      console.log(`Made order from ${user1}`);
      // Wait 1 second
      await wait(1);
    }

    // User 2 makes 10 orders
    for (let i = 1; i <= 10; i++) {
      result = await exchange.makeOrder(
        ETHER_ADDRESS,
        ether(0.001),
        token.address,
        tokens(10 * i),
        { from: user2 }
      );
      console.log(`Made order from ${user2}`);
      // Wait 1 second
      await wait(1);
    }
    //   let owner;
    //   let addr1;
    //   let addr2;
    //   let ether;
    //   let user1;
    //   let user2;
    //   let exchange;
    //   let token;
    //   [owner, addr1, addr2, ether, user1, user2] = await ethers.getSigners();
    //   token = await Token.deploy();
    //   await token.deployed();
    //   console.log("Token Fetched :", token.address);
    //   exchange = await Exchange.deploy(addr1.address, feePercent);
    //   await exchange.deployed();
    //   console.log("Exchange Fetched :", exchange.address);

    //   //give token to address 1;
    //   await token.transferTo(addr1.address, tokens(10000), {
    //     from: owner.address,
    //   });
    //   console.log(
    //     `transfered ${tokens(10000)} to ${addr1.address} from ${owner.address}`
    //   );

    //   //user 1 deposites ether
    //   const transaction = await exchange
    //     .connect(user1)
    //     .depositeEther(ether.address, {
    //       from: user1.address,
    //       value: ethers.utils.parseEther("1"),
    //     });
    //   await transaction.wait();
    //   console.log(
    //     `deposited ${ethers.utils.parseEther(1)} ether from ${user1.address} `
    //   );

    //   //user 2 approve tokens
    //   await token.connect(user2).approve(exchange.address, tokens(10000), {
    //     from: user2.address,
    //   });
    //   console.log(`Approved  ${tokens(10000)} from ${user2.address} `);

    //   //user2 deposite tokens
    //   await exchange.connect(user2).depositeToken(token.address, tokens(10000), {
    //     from: user2.address,
    //   });
    //   console.log(`Deposite ${tokens(10000)} from ${user2.address} `);

    //   // User 1 makes order to get tokens
    //   let result;
    //   let orderId;
    //   result = await exchange
    //     .connect(user1)
    //     .makeOrder(
    //       token.address,
    //       tokens(100),
    //       ether.address,
    //       ethers.utils.parseEther(0.01),
    //       { from: user1.address }
    //     );
    //   console.log(`Made order from ${user1}`);

    //   // User 1 cancells order
    //   orderId = result.logs[0].args.id;
    //   await exchange.connect(user1).cancelOrder(orderId, { from: user1.address });
    //   console.log(`Cancelled order from ${user1.address}`);

    //   /////////////////////////////////////////////////////////////
    //   // Seed Filled Orders
    //   //

    //   // User 1 makes order
    //   result = await exchange
    //     .connect(user1)
    //     .makeOrder(
    //       token.address,
    //       tokens(100),
    //       ether.address,
    //       ethers.utils.parseEther(0.01),
    //       { from: user1.address }
    //     );
    //   console.log(`Made order from ${user1.address}`);

    //   // User 2 fills order
    //   orderId = result.logs[0].args.id;
    //   await exchange.connect(user2).fillOrder(orderId, { from: user2.address });
    //   console.log(`Filled order from ${user1.address}`);

    //   // Wait 1 second
    //   await wait(1);

    //   // User 1 makes another order
    //   result = await exchange
    //     .connect(user1)
    //     .makeOrder(
    //       token.address,
    //       tokens(50),
    //       ether.address,
    //       ethers.utils.parseEther(0.001),
    //       { from: user1.address }
    //     );
    //   console.log(`Made order from ${user1.address}`);

    //   // User 2 fills another order
    //   orderId = result.logs[0].args.id;
    //   await exchange.connect(user2).fillOrder(orderId, { from: user2.address });
    //   console.log(`Filled order from ${user1.address}`);

    //   // Wait 1 second
    //   await wait(1);

    //   // User 1 makes final order
    //   result = await exchange
    //     .connect(user1)
    //     .makeOrder(
    //       token.address,
    //       tokens(200),
    //       ether.address,
    //       ethers.utils.parseEther(0.015),
    //       { from: user1.address }
    //     );
    //   console.log(`Made order from ${user1.address}`);

    //   // User 2 fills final order
    //   orderId = result.logs[0].args.id;
    //   await exchange.connect(user2).fillOrder(orderId, { from: user2 });
    //   console.log(`Filled order from ${user1.address}`);

    //   // Wait 1 second
    //   await wait(1);

    //   /////////////////////////////////////////////////////////////
    //   // Seed Open Orders
    //   //

    //   // User 1 makes 10 orders
    //   for (let i = 1; i <= 10; i++) {
    //     result = await exchange
    //       .connect(user1)
    //       .makeOrder(
    //         token.address,
    //         tokens(10 * i),
    //         ether.address,
    //         ethers.utils.parseEther(0.001),
    //         { from: user1.address }
    //       );
    //     console.log(`Made order from ${user1.address}`);
    //     // Wait 1 second
    //     await wait(1);
    //   }

    //   // User 2 makes 10 orders
    //   for (let i = 1; i <= 10; i++) {
    //     result = await exchange
    //       .connect(user2)
    //       .makeOrder(
    //         ether.address,
    //         ethers.utils.parseEther(0.001),
    //         token.address,
    //         tokens(10 * i),
    //         { from: user2.address }
    //       );
    //     console.log(`Made order from ${user2.address}`);
    //     // Wait 1 second
    //     await wait(1);
    // }

    // console.log("script running");
  } catch (error) {
    console.log(error);
  }

  callback();
};
