import { createTheme } from '@mui/material';

const options = {};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  ...options,
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  ...options,
});
