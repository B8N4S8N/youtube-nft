import React, { useState } from 'react';
import { useEffect } from 'react';
import web3 from 'web3';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Connect to the blockchain
      const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      // Get the ABI and contract address for your profile contract
      const contractABI = require('./Profile.json');
      const contractAddress = '0x...';
      // Create a new contract instance
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      // Get the current user address
      const accounts = await web3.eth.getAccounts();
      // Call the createProfile function on the contract instance
      // passing in the name, email, and address from the form
      const result = await contract.methods.createProfile(name, email, address).send({ from: accounts[0] });
      // Check if the transaction was successful
      if (result.status) {
        setSuccess(true);
        setLoading(false);
      } else {
        setError('Error creating profile, please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };}
