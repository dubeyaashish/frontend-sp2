import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutWithNavigation from './LayoutNavigation';
import StatusPage from './Status';
import GeneralPage from './General';
import SettingsPage from './Settings';
import LoginPage from './Login';
import UserGeneralPage from './UserGeneral'; // Import the UserGeneralPage component

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <LayoutWithNavigation open={drawerOpen} handleDrawerToggle={toggleDrawer}>
          <Route index element={<GeneralPage />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* Add the route for UserGeneralPage */}
          <Route path="user-general" element={<UserGeneralPage />} />
        </LayoutWithNavigation>
      } />
    </Routes>
  );
}
