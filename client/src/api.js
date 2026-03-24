import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL//API.get("/api/rooms") kiyala call karaddi, baseURL eka automatic add wenawa
});

export default API;