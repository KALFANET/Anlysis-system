
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:4000/api";

// Add authorization header to requests
axios.interceptors.request.use(
  (config) => {
    const apiKey = localStorage.getItem('AGENT_API_KEY');
    if (apiKey) {
      config.headers.Authorization = `Bearer ${apiKey}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Network status
export const checkNetwork = async () => {
  try {
    console.log("📡 Checking network connection...");
    const response = await axios.get(`${API_URL}/network/status`);
    return response.data;
  } catch (error) {
    console.error("❌ Network check failed:", error);
    return null;
  }
};

// Connect to WiFi
export const connectToWifi = async (ssid, password) => {
  try {
    const response = await axios.post(`${API_URL}/network/wifi`, { ssid, password });
    return response.data;
  } catch (error) {
    console.error("❌ WiFi connection failed:", error);
    throw error;
  }
};

// Scan for devices
export const scanForDevices = async () => {
  try {
    const response = await axios.get(`${API_URL}/network/scan`);
    return response.data.devices;
  } catch (error) {
    console.error("❌ Device scan failed:", error);
    return [];
  }
};

// Save network configuration
export const saveNetworkConfig = async (config) => {
  try {
    const response = await axios.post(`${API_URL}/network/config`, config);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to save network config:", error);
    throw error;
  }
};
