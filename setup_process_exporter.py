#!/usr/bin/env python3
"""
Network Manager Setup Process Exporter

This script exports all necessary files and code to develop the
initial setup process for the Network Manager system.
"""

import os
import sys
import json
import shutil
from pathlib import Path
import argparse
import subprocess

def main():
    parser = argparse.ArgumentParser(description="Export Network Manager setup process files")
    parser.add_argument("--output-dir", default="setup_process", help="Output directory")
    args = parser.parse_args()

    output_dir = Path(args.output_dir)
    if output_dir.exists():
        choice = input(f"Directory {output_dir} already exists. Overwrite? (y/n): ")
        if choice.lower() != "y":
            print("Exiting without making changes.")
            return
        shutil.rmtree(output_dir)

    output_dir.mkdir(parents=True)
    (output_dir / "backend").mkdir()
    (output_dir / "client").mkdir()
    (output_dir / "agent").mkdir()

    print("🔄 Cloning repositories...")
    # Clone repositories
    repos = {
        "backend": "https://github.com/KALFANET/PC_MAC_Network_Manager.git",
        "client": "https://github.com/KALFANET/Client-Electron.git",
        "agent_macos": "https://github.com/KALFANET/agent-macos.git",
    }

    temp_dir = output_dir / "temp"
    temp_dir.mkdir()

    for repo_name, repo_url in repos.items():
        print(f"Cloning {repo_name}...")
        repo_dir = temp_dir / repo_name
        subprocess.run(["git", "clone", repo_url, str(repo_dir)], check=True)

    print("📋 Copying setup-related files...")
    # Setup related files to copy
    files_to_copy = {
        "backend": [
            "agent/webpack.config.js",
            "client/dist/reportWebVitals.js",
            "client/dist/setupTests.js",
            "client/src/reportWebVitals.js",
            "client/src/setupTests.js",
            "client-electron/dist/App.js",
            "client-electron/build/static/js/main.ec444321.js",
            "client-electron/dist/renderer/index.js",
            "client-electron/dist/components/Dashboard.js",
            "client-electron/dist/services/validation.js",
        ],
        "client": [
            "client/src/setupTests.ts",
            "client/src/theme.ts",
            "client/src/services/api.ts",
            "client/src/App.tsx",
            "client/src/components/SoftwareInstall.tsx",
            "client/src/pages/SoftwareManagement.tsx",
            "client/down.py",
            "client/package-lock.json",
            "client/tsconfig.json",
        ],
        "agent_macos": [
            "main.js",
            "mac/trayManager.js",
            "common/logger.js",
            "common/credentialManager.js",
            "common/api-key-checker.js",
            "common/backendClient.js",
            "services/installService.js",
            "file.py",
            "change.py",
            "package-lock.json",
        ],
    }

    # Copy files
    for repo_name, files in files_to_copy.items():
        repo_dir = temp_dir / repo_name
        for file_path in files:
            src_path = repo_dir / file_path
            if src_path.exists():
                dest_path = output_dir / repo_name / Path(file_path).name
                print(f"Copying {file_path}")
                shutil.copy2(src_path, dest_path)

    # Generate template files
    print("📝 Generating template files...")

    # Setup.tsx
    setup_component = """
import React, { useState, useEffect } from "react";
import { Box, Button, Input, Select, VStack, Heading, useToast } from "@chakra-ui/react";

const Setup: React.FC = () => {
  // State variables
  const [step, setStep] = useState(1);
  const [networkType, setNetworkType] = useState("ethernet");
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [serverIp, setServerIp] = useState("");
  const [serverMac, setServerMac] = useState("");
  const toast = useToast();

  // Handlers
  const handleSetup = async () => {
    // Implementation
  };

  // Render
  return (
    <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg" bg="gray.50">
      <Heading size="md" mb={4}> 🔧 התקנה ראשונית </Heading>
      {/* Wizard steps */}
      <VStack spacing={4} align="stretch">
        {/* Form fields */}
        <Button colorScheme="blue" onClick={handleSetup}>שמור והפעל</Button>
      </VStack>
    </Box>
  );
};

export default Setup;
"""

    with open(output_dir / "client" / "Setup.tsx", "w", encoding="utf-8") as f:
        f.write(setup_component)

    # api.ts
    api_service = """
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:4000/api";

// Add authorization header
axios.interceptors.request.use(
  (config) => {
    const apiKey = localStorage.getItem("AGENT_API_KEY");
    if (apiKey) {
      config.headers.Authorization = `Bearer ${apiKey}`;
    } else {
      console.warn("⚠️ No API Key found in localStorage!");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Check network status
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
"""

    with open(output_dir / "client" / "api.ts", "w", encoding="utf-8") as f:
        f.write(api_service)

    # networkController.js
    network_controller = """
const Network = require("../models/Network");
const os = require("os");

// Get network status
exports.getNetworkStatus = async (req, res) => {
    try {
        // Check network interfaces
        const networkInterfaces = os.networkInterfaces();
        let connected = false;
        let type = null;

        // Implementation

        return res.json({
            connected,
            type
        });
    } catch (err) {
        console.error("Error getting network status:", err);
        return res.status(500).json({ error: "Server error" });
    }
};
"""

    with open(output_dir / "backend" / "networkController.js", "w", encoding="utf-8") as f:
        f.write(network_controller)

    # setup_implementation.py
    setup_implementation = """
#!/usr/bin/env python3
"""
Network Manager Setup Process Implementation

This script implements the backend functionality needed for the setup process.
"""

import os
import sys
import json
import socket
import subprocess
from pathlib import Path

def check_network_status():
    """Check the current network status"""
    # Implementation
    return {"connected": True, "type": "ethernet"}

def connect_to_wifi(ssid, password):
    """Connect to a WiFi network"""
    # Implementation
    return {"success": True}

def scan_for_devices():
    """Scan the network for devices with the Agent installed"""
    # Implementation
    return []

def save_network_config(config):
    """Save the network configuration"""
    # Implementation
    return {"success": True}

if __name__ == "__main__":
    # Main implementation
    pass
"""

    with open(output_dir / "setup_implementation.py", "w", encoding="utf-8") as f:
        f.write(setup_implementation)

    # README.md
    readme = """
# Network Manager Setup Process

## Overview
This project contains the files needed to implement the initial setup process for the Network Manager system.

## Directory Structure
- `backend/` - Backend controller and model files
- `client/` - React frontend components
- `agent/` - Agent discovery and registration files

## Setup Process Flow
1. Initial setup screen loads
2. Network connection check (Ethernet/WiFi)
3. System configuration
4. Device scanning and registration
5. Save configuration and restart

## Implementation Guide
1. Integrate these files into their respective projects
2. Implement missing functionality
3. Test the complete setup flow
"""

    with open(output_dir / "README.md", "w", encoding="utf-8") as f:
        f.write(readme)

    # Clean up temporary directory
    shutil.rmtree(temp_dir)

    print(f"✅ Setup process files exported to: {output_dir}")
    print("You can now use these files to implement the setup process.")

if __name__ == "__main__":
    main()
