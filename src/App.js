import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LayoutWithNavigation from './LayoutNavigation'; // This is for the admin layout
import UserLayoutWithNavigation from './UserLayoutNavigation'; // This is for the user layout
import GeneralPage from './General';
import StatusPage from './Status';
import SettingsPage from './Settings';
import LoginPage from './Login';
import UserGeneralPage from './UserGeneral';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    // You should also add logic here to actually log the user out, like clearing tokens or cookies.
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderLayout = () => {
    if (userRole === 'Admin') {
      return (
        <LayoutWithNavigation open={drawerOpen} handleDrawerToggle={toggleDrawer} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<GeneralPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Redirect any other path to "/" */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LayoutWithNavigation>
      );
    } else { // Assumes any non-admin user will use the UserLayout
      return (
        <UserLayoutWithNavigation open={drawerOpen} handleDrawerToggle={toggleDrawer} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<UserGeneralPage />} />
            {/* Redirect any other path to "/" */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </UserLayoutWithNavigation>
      );
    }
  };

  return <div>{isLoggedIn ? renderLayout() : <LoginPage onLoginSuccess={handleLoginSuccess} />}</div>;
}
