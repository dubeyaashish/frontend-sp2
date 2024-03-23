import React from 'react';
import UserNavigation from './UserNavigation';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const drawerWidth = 50;
const contentShift = 60;

export default function LayoutWithUserNavigation({ children, open, handleDrawerToggle, onLogout }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <UserNavigation open={open} handleDrawerToggle={handleDrawerToggle} onLogout={onLogout} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: `${open ? drawerWidth : 50}px`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
