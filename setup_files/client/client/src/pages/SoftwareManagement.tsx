import React, { useState } from "react";
import axios from "axios";

const SoftwareManagement: React.FC = () => {
  const [deviceId, setDeviceId] = useState("");
  const [softwareUrl, setSoftwareUrl] = useState("");
  const [os, setOs] = useState("windows"); // ✅ ברירת מחדל Windows

  const handleInstall = async () => {
    await axios.post("http://localhost:4000/api/software/install", { deviceId, softwareUrl, os });
  };

  return (
    <div>
      <h2>Install Software</h2>
      <input type="text" placeholder="Device ID" onChange={(e) => setDeviceId(e.target.value)} />
      <input type="text" placeholder="Software URL" onChange={(e) => setSoftwareUrl(e.target.value)} />
      
      {/* ✅ בחירת מערכת הפעלה */}
      <select onChange={(e) => setOs(e.target.value)}>
        <option value="windows">Windows (EXE)</option>
        <option value="macos">macOS (DMG)</option>
      </select>

      <button onClick={handleInstall}>Install</button>
    </div>
  );
};

export default SoftwareManagement;