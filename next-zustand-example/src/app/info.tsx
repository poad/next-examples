'use client';
import Box from '@mui/material/Box';
import React, { JSX } from 'react';
import { Counter } from '../components/Counter';

const Info = (): JSX.Element => {
  return (
    <>
      <Box component="main" sx={{ width: '100%', color: '#333' }}>
        <Box
          sx={{
            margin: '0',
            width: '100%',
            paddingTop: '80px',
            lineHeight: '1.15',
            justifyContent: 'space-around',
          }}
        >
          <Box
            sx={{
              alignContent: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Counter />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Info;
