require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config(); // Import dotenv to load environment variables

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: "https://polygon-mumbai.blockpi.network/v1/rpc/public	",
     accounts: [`d37f19406fb35cbf201240258222adebe2f7853d12e9b7af1d8344a6f7bb7902`],
     chainId: 80001,
    },
   
    polygon: {
      url: 'https://rpc.ankr.com/polygon_mumbai/17269e0a433607833a1b641bd4121dd1247886e059d01fb8a9c5ab41a0f6332f',
      accounts: ['ba4afa8fb9312ade6cd37bd878f49a548744d5726d66057fe0d733f7bef21dcf'],
      chainId: 80001,
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
