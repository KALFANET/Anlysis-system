import React, { useEffect } from 'react';
import { useSystemStore } from './store';
import { Box, Container, Heading, VStack, Divider, Grid } from '@chakra-ui/react';
import DevicesList from './components/DevicesList';
import SoftwareInstall from './components/SoftwareInstall';
import RemoteCommand from './components/RemoteCommand';

const App: React.FC = () => {
  const { devices, loadDevices } = useSystemStore() as { devices: any; loadDevices: () => void };

  useEffect(() => {
    console.log("📡 Loading devices...");
    loadDevices();
  }, [loadDevices]);

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" textAlign="center">
          ניהול מכשירים
        </Heading>
        <Divider />

        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
          <Box>
            <DevicesList />
          </Box>
          <VStack spacing={6} align="stretch">
            <SoftwareInstall />
            <RemoteCommand />
          </VStack>
        </Grid>
      </VStack>
    </Container>
  );
};

export default App;