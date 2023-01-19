import React, { useState } from 'react';
import { useEffect } from 'react';
import web3 from 'web3';
import contractABI from './Video.json';
import contractAddress from './contractAddress.json';
import Profile from './profile.js';
import UploadVideo from './UploadVideo';

const Index = () => {

    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        try {
            // Connect to the blockchain
            const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
            // Get the contract instance
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            // Get the most popular videos
            const videoCount = await contract.methods.getVideoCount().call();
            const popularVideos = [];
            for (let i = 0; i < videoCount; i++) {
                const video = await contract.methods.getVideo(i).call();
                popularVideos.push(video);
            }
            setVideos(popularVideos);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        fetchVideos();
    }, []);
    

    return (
        <div>
            <Profile />
            <UploadVideo />
            <div>
    {videos.map((video, index) => (
        <div key={index}>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            <p>Watch Time: {video.watchTime}</p>
        </div>
    ))}
</div>


        </div>
    );
};

export default Index;
