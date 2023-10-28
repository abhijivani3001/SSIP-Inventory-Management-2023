import axios from "axios";

const API = axios.create({
  baseURL: "https://ssip-inventory-management-2023-backend.vercel.app",
});

export default API;