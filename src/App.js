import React, { useState } from "react";
import { Routes, Route, Navigate,Router } from "react-router-dom";
import LayoutWithNavigation from "./LayoutNavigation";
import LayoutWithUserNavigation from "./LayoutUserNavigation";
import GeneralPage from "./General";
import StatusPage from "./Status";
import SettingsPage from "./Settings";
import LoginPage from "./Login";
import UserGeneralPage from "./UserGeneral";
import UserProfilePage from "./UserProfile";
import UserHistoryPage from "./UserHistory";
import AccountPage from "./Account";
import CreateAccount from "./CreateAccount";
import EmployeePage from "./Employees";
import EmployeeProfile from './EmployeeProfile';
import EmployeeHistory from './EmployeeHistory';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import API, { setAuthToken } from './api'; 

const firebaseConfig = {
  apiKey: "AIzaSyCAP8DRvSdpG7B0D0Y2PXOONlhtDo1JxZQ",
  authDomain: "senior2-2e798.firebaseapp.com",
  databaseURL:
    "https://senior2-2e798-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "senior2-2e798",
  storageBucket: "senior2-2e798.appspot.com",
  messagingSenderId: "675717960941",
  appId: "1:675717960941:web:45187efb193bae074b68e4",
  measurementId: "G-BTXE84PLJ8",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // Add this line
  const navigate = useNavigate(); // Add thi

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setAuthToken(token);
  //     setIsLoggedIn(true);
  //     setUserRole('admin'); // Adjust based on your user role logic
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/login'); // Redirects to login page if not logged in
  //   }
  // }, [isLoggedIn, navigate]);

  const handleLoginSuccess = (isAdmin) => {
    setIsLoggedIn(true);
    setUserRole(isAdmin ? 'admin' : 'client'); // Set the user role based on isAdmin
    navigate(isAdmin ? "/general" : "/user-general");
  };

  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserRole(null);
  };
  


  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };



  return (
    
    <div>
      {isLoggedIn ? ( 
        userRole === 'admin' ? (
        <LayoutWithNavigation
          open={drawerOpen}
          handleDrawerToggle={toggleDrawer}
          onLogout={handleLogout}
        >
          <Routes>
            <Route path="/" element={<GeneralPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/employees" element={<EmployeePage/>}/>
            <Route path="/employee-profile/:id" element={<EmployeeProfile />} />
            <Route path="/employee-history/:id" element={<EmployeeHistory/>} />
            <Route path="/create-account" element={<CreateAccount />} /> {/* Route for CreateAccount */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LayoutWithNavigation>
      ) : (
        <LayoutWithUserNavigation
              open={drawerOpen}
              handleDrawerToggle={toggleDrawer}
              onLogout={handleLogout} // 

            >
              <Routes>
              <Route path="/user-general" element={<UserGeneralPage />} />
              <Route path="/user-profile" element={<UserProfilePage />} />
              <Route path="/user-history" element={<UserHistoryPage />} />
              {/* <Route path="/user-history" element={<UserHistoryPage />} /> */}
              {/* <Route path="/user-account" element={<UserAccountPage />} /> */}
              </Routes>
            </LayoutWithUserNavigation>
      )
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}