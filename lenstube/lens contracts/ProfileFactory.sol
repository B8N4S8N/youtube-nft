pragma solidity ^0.8.0;

import "https://github.com/lensprotocol/contracts/contracts/NFTs/NFTs.sol";

contract ProfileFactory {
    address public lens;
    mapping (address => bool) public profiles;

    constructor() public {
        lens = address(new NFTs());
    }

    function createProfile() public {
        require(!profiles[msg.sender], "Profile already exists");

        NFTs(lens).create(msg.sender, "Creator Profile");
        profiles[msg.sender] = true;
    }

    function setBio(string memory bio) public {
        require(profiles[msg.sender], "Profile does not exist");
        NFTs(lens).setText(msg.sender, "bio", bio);
    }

    function getBio() public view returns (string memory) {
        return NFTs(lens).getText(msg.sender, "bio");
    }
}