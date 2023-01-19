pragma solidity ^0.8.0;
import "./ProfileFactory.sol";
import "./VideoNFTFactory.sol";
import "./LazyMint.sol";
import "./Tip.sol";

contract Parent {
    address public profileFactory;
    address public videoNFTFactory;
    address public lazyMint;
    address public tip;

    constructor() public {
        profileFactory = address(new ProfileFactory());
        videoNFTFactory = address(new VideoNFTFactory());
        lazyMint = address(new LazyMint());
        tip = address(new Tip());
    }

    function createProfile() public {
        ProfileFactory(profileFactory).createProfile();
    }

    function uploadVideo(string memory title) public {
        VideoNFTFactory(videoNFTFactory).uploadVideo(title);
    }

    function lazyMint() public {
        LazyMint(lazyMint).mint();
    }

    function tipCreator(address payable to, uint256 value) public {
        Tip(tip).tip(to, value);
    }
}
