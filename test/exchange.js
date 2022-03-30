const { expect } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseEther(n.toString());
};
describe("Exchange", function () {
  let Exchange;
  let exchange;
  let Token;
  let token;
  let owner;
  let addr1;
  let addr2;
  let ether;
  let feePercent = 10;
  let user1;
  let user2;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.deployed();
    Exchange = await ethers.getContractFactory("Exchange");
    [owner, addr1, addr2, ether, user1, user2] = await ethers.getSigners();
    exchange = await Exchange.deploy(addr1.address, feePercent);
    await exchange.deployed();
    token.transferTo(addr2.address, tokens(100), { from: owner.address });
  });

  it("Should track fee account", async function () {
    expect(await exchange.feeAccount()).to.equal(addr1.address);
  });

  it("Should track fee percent", async function () {
    expect(await exchange.feePercent()).to.equal(feePercent);
  });

  describe("Depositing Tokens", () => {
    let results;
    beforeEach(async function () {
      await token.connect(addr2).approve(exchange.address, tokens(10), {
        from: addr2.address,
      });

      results = await exchange
        .connect(addr2)
        .depositeToken(token.address, tokens(10), {
          from: addr2.address,
        });
    });

    describe("Success", () => {
      it("Should track token deposite", async function () {
        expect(await token.balanceOf(exchange.address)).to.equal(tokens(10));
      });

      it("Should track token deposite amount", async function () {
        expect(await exchange.tokens(token.address, addr2.address)).to.equal(
          tokens(10)
        );
      });
    });

    describe("Withdrawing Tokens", () => {
      beforeEach(async function () {
        results = await exchange
          .connect(addr2)
          .withdrawTokens(token.address, tokens(10), {
            from: addr2.address,
          });
      });

      it("Should withdraw token amount", async function () {
        expect(await exchange.tokens(token.address, addr2.address)).to.equal(
          tokens(0)
        );
      });
    });
  });

  describe("Deposite Ether", () => {
    beforeEach(async function () {
      const transaction = await exchange
        .connect(addr2)
        .depositeEther(ether.address, {
          from: addr2.address,
          value: ethers.utils.parseEther("2"),
        });
      await transaction.wait();
    });
    it("Deposite ether successfully", async function () {
      expect(await exchange.tokens(ether.address, addr2.address)).to.equal(
        tokens(2)
      );
    });

    describe("Withdraw Ether", () => {
      beforeEach(async function () {
        const transaction = await exchange
          .connect(addr2)
          .depositeEther(ether.address, {
            from: addr2.address,
            value: ethers.utils.parseEther("2"),
          });
        await transaction.wait();
      });

      describe("success", () => {
        beforeEach(async function () {
          const transaction = await exchange
            .connect(addr2)
            .withdrawEther(ethers.utils.parseEther("2"), ether.address, {
              from: addr2.address,
            });
          await transaction.wait();
        });
        it("withdraw ether successfully", async function () {
          expect(await exchange.tokens(ether.address, addr2.address)).to.equal(
            tokens(2)
          );
        });
      });
    });
  });

  describe("Making Orders", () => {
    let result;
    beforeEach(async () => {
      result = await exchange
        .connect(addr2)
        .makeOrder(token.address, tokens(1), ether.address, tokens(1), {
          from: addr2.address,
        });
    });

    it("track newly created order", async function () {
      const orderCount = await exchange.orderCount();
      expect(orderCount).to.equal(1);
      //check for all the fiels of the order
    });
  });

  describe("Orders actions", () => {
    let result;
    beforeEach(async () => {
      result = await exchange
        .connect(addr2)
        .makeOrder(token.address, tokens(1), ether.address, tokens(1), {
          from: addr2.address,
        });
    });

    describe("filling order", () => {
      beforeEach(async () => {
        const transaction = await exchange
          .connect(user1)
          .depositeEther(ether.address, {
            from: user1.address,
            value: ethers.utils.parseEther("1"),
          });

        await token.transferTo(user2.address, tokens(100), {
          from: owner.address,
        });

        await token
          .connect(user2)
          .approve(exchange.address, tokens(2), { from: user2.address });

        await exchange
          .connect(user2)
          .depositeToken(token.address, tokens(2), { from: user2.address });

        await transaction.wait();
        result = await exchange
          .connect(user1)
          .makeOrder(
            token.address,
            tokens(1),
            ether.address,
            ethers.utils.parseEther("1"),
            {
              from: user1.address,
            }
          );

        await exchange.connect(user2).fillOrder(1, { from: user2.address });
      });

      it("execute trade and charges fee", async function () {
        const user1Balance = await exchange.balanceOf(
          token.address,
          user1.address
        );
        expect(user1Balance).to.equal(tokens(1));

        //test for other things moro
      });
    });

    describe("cancelling order", () => {
      let result;
      beforeEach(async () => {
        result = await exchange.connect(addr2).cancelOrder("1", {
          from: addr2.address,
        });
      });
      it("update cancel order", async function () {
        const orderCancelled = await exchange.orderCancelled(1);
        expect(orderCancelled).to.equal(true);
        //check for all the fiels of the order
      });
    });
  });
});
