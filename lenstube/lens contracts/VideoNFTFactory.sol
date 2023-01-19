pragma solidity ^0.8.0;
import "https://github.com/lensprotocol/contracts/contracts/NFTs/NFTs.sol";
import "./ProfileFactory.sol";

contract VideoNFTFactory {
    address public lens;
    address public profileFactory;
    mapping (address => mapping (bytes32 => bool)) public videos;

    constructor() public {
        lens = address(new NFTs());
        profileFactory = address(new ProfileFactory());
    }

    function uploadVideo(string memory title) public {
        require(ProfileFactory(profileFactory).profiles[msg.sender], "Creator profile does not exist");
        bytes32 id = keccak256(abi.encodePacked(msg.sender, title));
        require(!videos[msg.sender][id], "Video already exists");

        NFTs(lens).create(msg.sender, title);
        videos[msg.sender][id] = true;
    }
}
