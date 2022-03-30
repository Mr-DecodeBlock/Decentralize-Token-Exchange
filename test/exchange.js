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
  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.deployed();
    Exchange = await ethers.getContractFactory("Exchange");
    [owner, addr1, addr2, ether] = await ethers.getSigners();
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
            tokens(0)
          );
        });
      });
    });
  });
});
