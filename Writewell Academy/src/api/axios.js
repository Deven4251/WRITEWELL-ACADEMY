import axios from "axios";

// Get the API URL - fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Log the API URL on load (for debugging)
console.log("🔗 API Base URL configured as:", API_URL || "NOT SET - using fallback");

const api = axios.create({
    baseURL: API_URL,                       // Render backend URL or localhost fallback
    withCredentials: true,                   // required for CORS cookies
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor - log outgoing requests
api.interceptors.request.use(
    (config) => {
        console.log("📤 API Request:", config.method?.toUpperCase(), config.url);
        console.log("📤 Request data:", config.data);
        console.log("📤 Base URL:", config.baseURL);
        return config;
    },
    (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor - log responses and errors
api.interceptors.response.use(
    (res) => {
        console.log("✅ API Response:", res.status, res.config.url);
        return res;
    },
    (err) => {
        console.error("❌ API Error:", err);
        if (err.response) {
            // Server responded with error
            console.error("❌ Error Status:", err.response.status);
            console.error("❌ Error Data:", err.response.data);
            console.error("❌ Error Headers:", err.response.headers);
        } else if (err.request) {
            // Request made but no response
            console.error("❌ No response received:", err.request);
        } else {
            // Error setting up request
            console.error("❌ Request setup error:", err.message);
        }
        return Promise.reject(err);
    }
);

export default api;
