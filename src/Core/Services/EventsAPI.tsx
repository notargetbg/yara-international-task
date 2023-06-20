import axios from 'axios';

// add config to the API instance and set the US proxy
export const EventsAPI = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 10000,
});
