import React, { useState } from "react";
import { useSystemStore } from "../store";
import { installSoftware } from "../services/api";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";

const SoftwareInstall: React.FC = () => {
  const { devices } = useSystemStore();
  const [selectedDevice, setSelectedDevice] = useState("");
  const [softwareUrl, setSoftwareUrl] = useState("");
  const [isInstalling, setIsInstalling] = useState(false);
  const toast = useToast();

  const handleInstall = async () => {
    if (!selectedDevice || !softwareUrl) {
      toast({
        title: "שגיאה",
        description: "יש לבחור מכשיר ולהזין קישור לתוכנה.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // חיפוש מערכת ההפעלה של המכשיר הנבחר
    const selectedDeviceObj = devices.find(device => device.id === selectedDevice);
    if (!selectedDeviceObj) {
      toast({
        title: "שגיאה",
        description: "לא ניתן למצוא את המכשיר הנבחר.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsInstalling(true);
    try {
      await installSoftware(selectedDevice, softwareUrl, selectedDeviceObj.os); // שימוש ב-OS הנכון מהמכשיר
      toast({
        title: "התקנה נשלחה",
        description: `תהליך ההתקנה הותחל במכשיר ${selectedDeviceObj.name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "ההתקנה נכשלה. בדוק את הפרטים ונסה שוב.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg" bg="gray.50">
      <Heading size="md" mb={4}>
        התקנת תוכנות
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>בחר מכשיר</FormLabel>
          <Select
            placeholder="בחר מכשיר..."
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
          >
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name} ({device.os})
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>כתובת URL לתוכנה</FormLabel>
          <Input
            type="text"
            placeholder="https://example.com/software.pkg"
            value={softwareUrl}
            onChange={(e) => setSoftwareUrl(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          isLoading={isInstalling}
          onClick={handleInstall}
          isDisabled={!selectedDevice || !softwareUrl}
        >
          התקן תוכנה
        </Button>
      </VStack>
    </Box>
  );
};

export default SoftwareInstall;