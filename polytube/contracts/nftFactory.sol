// NFT Factory contract
pragma solidity ^0.8.0;

contract NFTFactory {

    address[] public lazyMintContracts;

    function createLazyMintContract(bytes32 _videoHash, string memory _title, string memory _description) public {
        address newContract = new LazyMintContract(_videoHash, _title, _description);
        lazyMintContracts.push(newContract);
    }
}

// Lazy Mint contract
pragma solidity ^0.8.0;

contract LazyMintContract {
    bytes32
