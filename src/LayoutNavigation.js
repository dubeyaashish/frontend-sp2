import React from 'react';
import Navigation from './Navigation';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const drawerWidth = 240;
const contentShift = 60;

export default function LayoutWithNavigation({ children, open, handleDrawerToggle }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navigation open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: `${open ? contentShift : 0}px`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
