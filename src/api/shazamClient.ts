import axios from 'axios';

const shazamClient = axios.create({
  baseURL: 'https://www.shazam.com',
  timeout: 10000,
});

export default shazamClient;
