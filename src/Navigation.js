import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Collapse, Toolbar, CssBaseline, Box
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const drawerWidth = 240;

export default function Navigation({ open }) {
  const [activeItem, setActiveItem] = React.useState(null);
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  const handleLogOut = () => {
    window.location.href = '/login';
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
        open={true}  // Drawer is always open
      >
        <Toolbar>
          <img src="/Sunmi.png" align="center" alt="Sunmi Logo" style={{ height: '70px' }} />
        </Toolbar>
        <List>
          <ListItem button onClick={() => handleItemClick('/')} sx={{ bgcolor: activeItem === '/' ? '#3498DB' : 'inherit' }}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="General" />
          </ListItem>
          <ListItem button onClick={() => handleItemClick('/settings')} sx={{ bgcolor: activeItem === '/settings' ? '#3498DB' : 'inherit' }}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={() => handleItemClick('/employees')} sx={{ bgcolor: activeItem === '/employees' ? '#3498DB' : 'inherit' }}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>
          </List>
          {/* Additional navigation items can be added here */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <List>
              <ListItem button onClick={() => handleItemClick('/account')} sx={{ bgcolor: activeItem === '/account' ? '#3498DB' : 'inherit' }}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
              <ListItem button onClick={handleLogOut}>
                <ListItemIcon>
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>
            </List>
          </Box>
      </Drawer>
    </div>
  );
}
