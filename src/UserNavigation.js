import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, CssBaseline, Box
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import FolderIcon from '@mui/icons-material/Folder';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import IconButton from '@mui/material/IconButton';
import API from './api';

const drawerWidth = 240;

export default function UserNavigation({ open }) {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  const handleLogOut = () => {
    navigate('/login');
  };

  return (
    <div>
      <CssBaseline />
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
        <Toolbar>
          <img src="/Sunmi.png" alt="Logo" style={{ height: '70px', marginLeft: '20px' }} />
        </Toolbar>
        <List>
          {/* Other navigation items */}
          <ListItem button onClick={() => handleItemClick('/user-general')} sx={{ bgcolor: activeItem === '/user-general' ? '#F0B869' : 'inherit' }}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="General" />
          </ListItem>
          <ListItem button onClick={() => handleItemClick('/userprofile')} sx={{ bgcolor: activeItem === '/userprofile' ? '#F0B869' : 'inherit' }}>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => handleItemClick('/userhistory')} sx={{ bgcolor: activeItem === '/userhistory' ? '#F0B869' : 'inherit' }}>
            <ListItemIcon><HistoryIcon /></ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <List>
            <ListItem button onClick={() => handleItemClick('/useraccount')} sx={{ bgcolor: activeItem === '/useraccount' ? '#F0B869' : 'inherit' }}>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
            <ListItem button onClick={handleLogOut}>
              <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}