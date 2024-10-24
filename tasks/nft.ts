import { task, types } from "hardhat/config";
import { Contract } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { env } from "../lib/env";
import { getContract } from "../lib/contract";
import { getWallet } from "../lib/wallet";
import "@nomiclabs/hardhat-ethers";

task("deploy-contract", "Deploy NFT contract").setAction(async (_, hre) => {
  try {
    const contractFactory = await hre.ethers.getContractFactory("MyNFT", getWallet());
    const result = await contractFactory.deploy({
      gasLimit: 500_000 // Set a specific gas limit
    });
    process.stdout.write(`Contract address: ${result.address}\n`);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
});

task("mint-nft", "Mint an NFT")
  .addParam("tokenurl", "Your ERC721 Token URI", undefined, types.string)
  .setAction(async (tokenurl, hre) => {
    return getContract("MyNFT", hre)
      .then((contract: Contract) => {
        return contract.mintNFT(env("ETH_PUBLIC_KEY"), tokenurl, {
          gasLimit: 500_000,
        });
      })
      .then((tr: TransactionResponse) => {
        process.stdout.write(`TX hash: ${tr.hash}`);
      });
  });
