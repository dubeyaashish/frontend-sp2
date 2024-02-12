import React from 'react';
import UserNavigation from './UserNavigation'; // Importing UserNavigation instead of Navigation
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const drawerWidth = 240;
const contentShift = 60;

export default function UserLayoutWithNavigation({ children, open, handleDrawerToggle }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <UserNavigation open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: `${open ? drawerWidth + contentShift : contentShift}px`, // Adjusted to include drawerWidth
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
