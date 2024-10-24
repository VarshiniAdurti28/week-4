// Note this require the NPM libraries imported, including sinon, chai, and sinon-chai. 
// The sinon.restore() call is necessary due to the use of stubbing.
import sinon from "sinon";
import { expect } from "chai";

import sinonChai from "sinon-chai";
import { ethers as hardhatEthers, waffle } from "hardhat";
import { Contract, Wallet } from "ethers";

chai.use(sinonChai);

afterEach(() => {
  sinon.restore();
});

export function deployTestContract(name: string): Promise<Contract> {
  return hardhatEthers
    .getContractFactory(name, getTestWallet())
    .then((contractFactory) => contractFactory.deploy());
}

export function getTestWallet(): Wallet {
  return waffle.provider.getWallets()[0];
}