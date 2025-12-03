import axios from "axios";

const api = axios.create({
    baseURL: "https://writewell-academy-1.onrender.com",
    withCredentials: true // CRITICAL for session cookies
});

export default api;
