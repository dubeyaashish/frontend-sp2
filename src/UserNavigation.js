import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton,
  Toolbar, CssBaseline
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Assuming this matches the "General" icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Assuming this matches the "Profile" icon
import HistoryIcon from '@mui/icons-material/History'; // Assuming this matches the "History" icon
import FolderIcon from '@mui/icons-material/Folder'; // Assuming this matches the "Accounts" icon
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'; // Assuming this matches the "Log Out" icon

const drawerWidth = 240;

export default function Navigation({ open, handleDrawerToggle }) {

  const handleLogOut = () => {
    // Redirect to the login page
    window.location.href = '/login';
  };

  return (
    <div>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{
          marginRight: '36px',
          ...(open && { display: 'none' }),
          marginLeft: '20px',
          position: 'fixed',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginTop: '8px',
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="General" />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/history">
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          <ListItem button component={Link} to="/accounts">
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItem>
          <ListItem button onClick={handleLogOut}>
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
