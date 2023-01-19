const startVideo = async () => {
    try {
        // Connect to the blockchain
        const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        // Get the contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        // Get the current user address
        const accounts = await web3.eth.getAccounts();
        // Start recording the watch time on the blockchain
        await contract.methods.startWatching().send({ from: accounts[0] });
    } catch (error) {
        console.log(error);
    }
};

const stopVideo = async () => {
    try {
        // Connect to the blockchain
        const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        // Get the contract instance
        const contract = new web3

.eth.Contract(contractABI, contractAddress);
// Get the current user address
const accounts = await web3.eth.getAccounts();
// Stop recording the watch time on the blockchain
await contract.methods.stopWatching().send({ from: accounts[0] });
} catch (error) {
console.log(error);
}
};

const getWatchTime = async () => {
try {
// Connect to the blockchain
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// Get the contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);
// Get the current user address
const accounts = await web3.eth.getAccounts();
// Get the watch time from the blockchain
const watchTime = await contract.methods.getWatchTime().call({ from: accounts[0] });
return watchTime;
} catch (error) {
console.log(error);
}
};

const App = () => {
return (
<div>
<button onClick={startVideo}>Start Video</button>
<button onClick={stopVideo}>Stop Video</button>
<p>Watch Time: {getWatchTime()}</p>
</div>
);
};

export default App;