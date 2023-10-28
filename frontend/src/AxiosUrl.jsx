import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ssip-inventory-management-2023-backend.vercel.app',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'), //the token is a variable which holds the token
  },
});

export default API;