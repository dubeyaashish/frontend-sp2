import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LayoutWithNavigation from './LayoutNavigation';
import GeneralPage from './General';
import StatusPage from './Status';
import SettingsPage from './Settings';
import LoginPage from './Login';
import UserGeneralPage from './UserGeneral';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <LayoutWithNavigation open={drawerOpen} handleDrawerToggle={toggleDrawer} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<GeneralPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/user-general" element={<UserGeneralPage />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LayoutWithNavigation>
  );
}
