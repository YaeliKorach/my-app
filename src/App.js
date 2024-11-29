import React from 'react';
import { CssBaseline } from '@mui/material';
import AppRoutes from './routes';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
