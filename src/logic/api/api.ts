import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.instagram.com/',});

export default api;
