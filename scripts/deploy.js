const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();

  await token.deployed();

  const Exchange = await hre.ethers.getContractFactory("Exchange");

  let feeAccount;
  let feePercent = 10;
  [owner, addr1, addr2, ether, user1, user2, feeAccount] =
    await ethers.getSigners();
  const exchange = await Exchange.deploy(feeAccount, feePercent);

  await exchange.deployed();

  console.log("Token deployed to:", token.address);
  console.log("Exchange deployed to:", exchange.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
