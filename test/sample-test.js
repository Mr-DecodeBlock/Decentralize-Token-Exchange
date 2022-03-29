const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  let Token;
  let token;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    token = await Token.deploy();
    await token.deployed();
  });

  it("Should have a name", async function () {
    expect(await token.name()).to.equal("My Name");
  });

  it("Should have a symbol", async function () {});

  it("Should have a decimal", async function () {});

  it("Should have a total supply", async function () {});
});
