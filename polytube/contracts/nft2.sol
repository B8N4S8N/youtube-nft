Pragma solidity ^0.8.0;

contract LazyMintContract {
    bytes32 public videoHash;
    string public title;
    string public description;
    uint public watchTime;
    bool public recording;

    function LazyMint(bytes32 _videoHash, string memory _title, string memory _description) public {
        videoHash = _videoHash;
        title = _title;
        description = _description;
    }

    function startWatching() public {
        recording = true;
    }

    function stopWatching() public {
        recording = false;
    }

    function pauseWatching() public {
        if (recording) {
            recording = false;
        }
    }

    function resumeWatching() public {
        if (!recording) {
            recording = true;
        }
    }

    function updateWatchTime() public {
        if (recording) {
            watchTime++;
        }
    }
}
