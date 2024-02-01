import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton,
  Collapse, Toolbar, CssBaseline
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const drawerWidth = 240;

export default function Navigation({ open, handleDrawerToggle }) {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubMenuClick = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const handleLogOut = () => {
    // Implement log out logic here
    // For example, clearing authentication tokens or user data

    // Redirect to the login page
    navigate('/Login'); // Adjust the path to match your routing setup
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
            <ListItemText primary="UserGeneral" />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/history">
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
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
