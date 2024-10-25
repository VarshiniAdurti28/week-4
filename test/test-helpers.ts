// Note this require the NPM libraries imported, including sinon, chai, and sinon-chai. 
// The sinon.restore() call is necessary due to the use of stubbing.
import sinon from "sinon";
import * as chai from "chai";
import sinonChai from "sinon-chai";

import { ethers } from "hardhat"; // Import ethers from Hardhat
import { Contract, Signer } from "ethers";
chai.use(sinonChai);


afterEach(() => {
  sinon.restore();
});

export async function deployTestContract(name: string): Promise<Contract> {
  const wallet = await getTestWallet(); // Get the test wallet
  const contractFactory = await ethers.getContractFactory(name, wallet);
  return contractFactory.deploy();
}

export async function getTestWallet(): Promise<Signer> {
  const [wallet] = await ethers.getSigners(); // Get the first signer
  return wallet; // Return the wallet directly
}