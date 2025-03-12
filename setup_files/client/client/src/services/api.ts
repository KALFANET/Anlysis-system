import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 📌 Interceptor להוספת הטוקן לכל בקשה
api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('AGENT_API_KEY');
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  } else {
    console.warn("⚠️ No API Key found in localStorage!");
  }
  return config;
}, (error) => Promise.reject(error));

// ✅ פונקציה לקבלת רשימת המכשירים
export const fetchDevices = async () => {
  try {
    console.log("📡 Fetching devices from backend...");
    const response = await api.get('/devices');
    return response.data.devices || [];
  } catch (error) {
    console.error("❌ Error fetching devices:", error);
    throw error;
  }
};

// ✅ פונקציה לרישום מכשיר חדש ושמירת ה-API Key
export const registerDevice = async (deviceData) => {
  try {
    console.log("📡 Registering new device...");
    const response = await api.post('/devices/register', deviceData);

    if (response.data?.apiKey) {
      localStorage.setItem('AGENT_API_KEY', response.data.apiKey);
      console.log("✅ API Key saved:", response.data.apiKey);
    } else {
      console.warn("⚠️ API Key was not returned from the server!");
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error registering device:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ שליחת פקודה מרחוק למכשיר כולל בדיקת טוקן
export const sendRemoteCommand = async (deviceId: string, command: string) => {
  try {
    console.log(`📡 Sending command '${command}' to device ${deviceId}...`);
    const response = await api.post('/devices/command', { deviceId, command });
    console.log(`✅ Command '${command}' executed successfully.`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error sending command '${command}':`, error.response?.data || error.message);
    throw error;
  }
};
// ✅ התקנת תוכנה כולל API Key
export const installSoftware = async (deviceId: string, softwareUrl: string, os: string) => {
  try {
    console.log(`📡 Installing software on device ${deviceId}...`);

    const response = await api.post('/software/install', { deviceId, softwareUrl, os });

    console.log(`✅ Software installation request sent successfully.`);
    return response.data;
  } catch (error: any) {
    console.error(`❌ Error installing software on device ${deviceId}:`, error.response?.data || error.message);
    return null;
  }
};