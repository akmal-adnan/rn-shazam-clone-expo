import axios from 'axios';
const EXPO_PUBLIC_API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const shazamCoreClient = axios.create({
  baseURL: 'https://shazam-core.p.rapidapi.com',
  timeout: 10000,
  headers: {
    'x-rapidapi-key': EXPO_PUBLIC_API_KEY ?? '',
    'x-rapidapi-host': 'shazam-core.p.rapidapi.com',
  },
});

export default shazamCoreClient;
