import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import LayoutWithNavigation from './LayoutNavigation';
import StatusPage from './Status';
import GeneralPage from './General';
import SettingsPage from './Settings';
import LoginPage from './Login';
import UserGeneralPage from './UserGeneral';

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
          <Routes> {/* Nested Routes inside LayoutWithNavigation */}
            <Route index element={<GeneralPage />} />
            <Route path="status" element={<StatusPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="user-general" element={<UserGeneralPage />} />
          </Routes>
        </LayoutWithNavigation>
      } />
      <Route path="*" element={<Navigate to="/" replace />} /> {/* Default Route */}
    </Routes>
  );
}
