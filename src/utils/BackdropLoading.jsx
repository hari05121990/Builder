import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

// eslint-disable-next-line react/prop-types
const BackdropLoading = ({ isLoading }) => {
  return (
    <Backdrop open={isLoading} sx={{ zIndex: 1301, color: '#fff' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoading;
