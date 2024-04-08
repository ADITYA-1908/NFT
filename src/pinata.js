//require('dotenv').config();


// API Key: 0e624e623d3053b6b893
 //API Secret: e08aeef1e68cc6530f10e97be346f702b1dd4655ea0b1b6c99f17d31dce9f1d5
 //JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.//eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDVmZTJkMi1hMzdkLTQ3MjAtYjVlMy05MTFkMmIzMGM3MDEiLCJlbWFpbCI6ImFheXVzaG1hbmJoYWJhcGFkaHlAcHJvdG9uLm1lIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xp//Y3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwi//c3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjBlNjI0ZTYyM2QzMDUzYjZiODkzIiwic2NvcGVkS2V5U2VjcmV0IjoiZTA4YWVlZjFlNjhjYzY1MzBmMTBlOTdiZTM0//NmY3MDJiMWRkNDY1NWVhMGIxYjZjOTlmMTdkMzFkY2U5ZjFkNSIsImlhdCI6MTcxMjQzMDMxNH0.eO1hG5y8i8jfjzJBNBWO8TvLbSE9ZbeSujxB4KeG1yI 

 const key = ['1aa90fdc29c4efab1729'];
 const secret = ['0fee9112736b57673af94aac27685273c267e0a3867bb4a5219ddcee1a0eefc2'];

const axios = require('axios');
const FormData = require('form-data');

export const uploadJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

export const uploadFileToIPFS = async(file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};