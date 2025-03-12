import { theme as chakraTheme } from '@chakra-ui/react';

const theme = {
  ...chakraTheme,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  direction: 'rtl',
};