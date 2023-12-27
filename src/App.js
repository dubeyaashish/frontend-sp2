import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './Navigation'; // Import the Navigation component
import { Routes, Route } from 'react-router-dom';
import StatusPage from './Status';
import GeneralPage from './General';
import SettingsPage from './Settings';

const drawerWidth = 240;
const contentShift = 60; // Smaller than drawerWidth to shift content slightly

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navigation open={drawerOpen} handleDrawerToggle={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          // Apply the smaller shift when the drawer is open
          marginLeft: `${drawerOpen ? contentShift : 0}px`,
          // Optional: If you want to maintain the original width, comment out the line below
          // width: `calc(100% - ${drawerOpen ? contentShift : 0}px)`,
        }}
      >
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<GeneralPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
