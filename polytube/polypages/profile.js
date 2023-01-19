import React, { useState } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import web3 from 'web3';
import contractABI from './Profile.json';
import contractAddress from './contractAddress.json';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
        // Connect to the blockchain
        const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
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
        setProfileCreated(true);
    } catch (err) {
        setError(err.message);
        setLoading(false);
        console.log(err);
    }
};


 

  return (
    <div>
      <h1>Create Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <Input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Ethereum Address</label>
          <Input
            type='text'
            placeholder='Ethereum Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Field>
        <Button type='submit' primary loading={loading}>
Create Profile
</Button>
{error && <Message negative>{error}</Message>}
{success && (
<Message positive>
Profile created successfully!
</Message>
)}
</Form>
</div>
);
};
export default Profile;