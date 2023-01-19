import React, { useState } from 'react';
import { useEffect } from 'react';
import web3 from 'web3';

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Prepare the file and data for the transaction
      const data = new FormData();
      data.append('file', file);
      data.append('title', title);
      data.append('description', description);

      // Connect to the blockchain
      const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      // Get the ABI and contract address for your video contract
      const contractABI = require('./Video.json');
      const contractAddress = '0x...';
      // Create a new contract instance
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      // Get the current user address
      const accounts = await web3.eth.getAccounts();
      // Call the uploadVideo function on the contract instance
      // passing in the file, title, and description data
      const result = await contract.methods.uploadVideo(data).send({ from: accounts[0] });
      // Check if the transaction was successful
      if (result.status) {
        setSuccess(true);
        setLoading(false);
      } else {
        setError('Error uploading video, please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const [watchTime, setWatchTime] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
          updateWatchTime();
      }, 1000);
      return () => clearInterval(interval);
  }, []);
  
  const updateWatchTime = async () => {
      try {
          // Connect to the blockchain
          const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
          // Get the contract instance
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          // Get the current user address
          const accounts = await web3.eth.getAccounts();
          // Update the watch time on the blockchain
          await contract.methods.updateWatchTime().send({ from: accounts[0] });
          // Update the watch time in the state
          setWatchTime(watchTime + 1);
      } catch (error) {
          console.log(error);
      }
  };
  


  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Video uploaded successfully!</p>}
      <button type="submit">Upload</button>
    </form>
  );

  
  

};

export default UploadVideo;