const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  let Token;
  let token;
  let owner;
  let addr1;
  let addr2;
  let name = "Hyadum Coin";
  let decimal = 18;
  let symbol = "HYC";
  let totalSupply = "1000000000000000000000000";

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await Token.deploy();
    await token.deployed();
  });

  it("Should have a name", async function () {
    expect(await token.name()).to.equal(name);
  });

  it("Should have a symbol", async function () {
    expect(await token.symbol()).to.equal(symbol);
  });

  it("Should have a decimal", async function () {
    expect(await token.decimals()).to.equal(decimal);
  });

  it("Should have a total supply", async function () {
    expect(await token.totalSupply()).to.equal(totalSupply);
  });

  it("Should assign totalSupply to deployer", async function () {
    expect(await token.balanceOf(owner.address)).to.equal(totalSupply);
  });

  describe("Transfer Tokens", () => {
    it("Transfer token balance", async function () {
      //check if the balance was deducted from total balance
      let balanceOwner;
      let balanceReciever;

      balanceOwner = await token.balanceOf(owner.address);
      console.log("before tx", balanceOwner);
      balanceReciever = await token.balanceOf(addr1.address);
      console.log("before tx", balanceReciever);

      await token.transferTo(addr1.address, "100000000000000000000", {
        from: owner.address,
      });

      balanceOwner = await token.balanceOf(owner.address);
      console.log("after tx", balanceOwner);
      balanceReciever = await token.balanceOf(addr1.address);
      console.log("after tx", balanceReciever);

      // expect(await token.balanceOf(owner.address)).to.equal(totalSupply);
    });
  });
});
