import "@nomiclabs/hardhat-ethers" ;
import "@nomiclabs/hardhat-waffle" ;

import "./tasks/nft";

import { HardhatUserConfig } from "hardhat/config";

// Import dotenv and load environment variables
import dotenv from 'dotenv';
dotenv.config();

const url = `https://eth-sepolia.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`;
const accounts = [process.env.ETH_PRIVATE_KEY];

export { url, accounts };

const npmConfigArgv = process.env.npm_config_argv;

if (npmConfigArgv) {
  try {
    // Parse the argv JSON only if the variable exists
    const argv = JSON.parse(npmConfigArgv);

    // when comparing arrays with !== or ===, it compares references, not the contents of the arrays. 
    // This means that even if two arrays have the same elements, 
    // they will be considered different unless they are the exact same reference.

    // if (argv.original !== ["hardhat", "test"]) {
    //   require('dotenv').config();
    // }

    if (argv.original.join(' ') !== ["hardhat", "test"].join(' ')) {
      require('dotenv').config();
    }

  } catch (error) {
    console.error('Failed to parse npm_config_argv:', error);
  }
} else {
  console.log('npm_config_argv is not available (run some npm commands!).');
}



const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.ETH_PRIVATE_KEY ? [process.env.ETH_PRIVATE_KEY] : [],  // Safely load accounts
      chainId: 11155111,
    },
  },
};

export default config;
