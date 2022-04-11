/* hardhat.config.js */
const fs = require("fs");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const secrets = JSON.parse(fs.readFileSync(".secrets.json").toString().trim());
require("@nomiclabs/hardhat-waffle");
const sender = fs.readFileSync("secret.txt").toString();
const receiver =
  "fbad5b495a37387d8d4278fbf8c7cf87728c787f0487a283b78b930991132192";
const ether =
  "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const feeAccount =
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const projectId = "8b7ba5517c414450a93ec7334975a7fe";
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    //  unused configuration commented out for now
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      // url: "https://goerli.infura.io/v3/8b7ba5517c414450a93ec7334975a7fe",
      accounts: [sender, receiver, ether, feeAccount],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    kovan: {
      url: "https://kovan.infura.io/v3/745fcbe1f649402c9063fa946fdbb84c",
      // url: "https://goerli.infura.io/v3/745fcbe1f649402c9063fa946fdbb84c",
      // url: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      // url: "https://goerli.infura.io/v3/8b7ba5517c414450a93ec7334975a7fe",
      accounts: [sender, receiver, ether, feeAccount],
      gas: 2100000,
      gasPrice: 8000000000,
      network_id: 42,
      // gas: 5000000,
      // gasPrice: 25000000000,
    },
    // https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
    // kovan_: {
    //   networkCheckTimeout: 10000,
    //   provider: () => {
    //     return new HDWalletProvider(
    //       secrets.mnemonic,
    //       `https://kovan.infura.io/v3/${secrets.projectId}`
    //     );
    //   },
    //   gas: 5000000,
    //   gasPrice: 25000000000,
    //   network_id: "42",
    // },
    mainet: {
      url: `https://palm-mainnet.infura.io/v3/${projectId}`,
      // accounts: [privateKey],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
