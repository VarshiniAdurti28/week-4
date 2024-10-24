// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";



contract Counter {
    uint256 private count;

    constructor() {
        count = 0; 
    }

    function increment() public {
        count += 1; 
    }

    function decrement() public {
        require(count > 0, "Counter underflow"); 
        count -= 1; 
    }

    function getCount() public view returns (uint256) {
        return count; 
    }
}


contract MyNFT is ERC721URIStorage {
    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIds;

    Counter private _tokenIds;

    constructor() ERC721("MyNFT", "MNFT") {
        _tokenIds = new Counter();
    }

    function mintNFT(address recipient, string memory tokenURI)
    public
    returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.getCount();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
