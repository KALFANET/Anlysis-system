
import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Select, VStack, Heading, useToast } from '@chakra-ui/react';

const Setup = () => {
  const [step, setStep] = useState(1);
  const [networkType, setNetworkType] = useState('ethernet');
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [serverIp, setServerIp] = useState('');
  const [serverMac, setServerMac] = useState('');
  const toast = useToast();

  const handleSetup = async () => {
    if (networkType === 'wifi' && (!ssid || !password)) {
      toast({
        title: "שגיאה",
        description: "יש להזין שם רשת וסיסמה.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // שמירת ההגדרות
      const setupData = { networkType, ssid, password, serverIp, serverMac };
      localStorage.setItem('networkSetup', JSON.stringify(setupData));

      toast({
        title: "הגדרות נשמרו",
        description: "המערכת תתאפס ותחזור עם ההגדרות החדשות.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Setup error:', error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בשמירת ההגדרות.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <Box>
            <Heading size="md" mb={4}>בדיקת חיבור רשת</Heading>
            {/* Content for step 1 */}
          </Box>
        );
      case 2:
        return (
          <Box>
            <Heading size="md" mb={4}>הגדרות רשת</Heading>
            <VStack spacing={4} align="stretch">
              <Select placeholder="בחר סוג חיבור" value={networkType} onChange={(e) => setNetworkType(e.target.value)}>
                <option value="ethernet">🔌 חיבור חוטי (Ethernet)</option>
                <option value="wifi">📡 חיבור אלחוטי (WiFi)</option>
              </Select>
              
              {networkType === 'wifi' && (
                <>
                  <Input placeholder="שם הרשת (SSID)" value={ssid} onChange={(e) => setSsid(e.target.value)} />
                  <Input type="password" placeholder="סיסמת WiFi" value={password} onChange={(e) => setPassword(e.target.value)} />
                </>
              )}

              <Input placeholder="כתובת IP של השרת" value={serverIp} onChange={(e) => setServerIp(e.target.value)} />
              <Input placeholder="כתובת MAC של השרת" value={serverMac} onChange={(e) => setServerMac(e.target.value)} />
            </VStack>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Heading size="md" mb={4}>סריקת מכשירים</Heading>
            {/* Content for step 3 */}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg" bg="gray.50">
      <Heading size="md" mb={4}> 🔧 התקנה ראשונית </Heading>
      {renderCurrentStep()}
      <VStack mt={6} spacing={4} align="stretch">
        <Button colorScheme="blue" onClick={handleSetup}>שמור והפעל</Button>
      </VStack>
    </Box>
  );
};

export default Setup;
