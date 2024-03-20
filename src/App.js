import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LayoutWithNavigation from "./LayoutNavigation";
import GeneralPage from "./General";
import StatusPage from "./Status";
import SettingsPage from "./Settings";
import LoginPage from "./Login";
import UserGeneralPage from "./UserGeneral";
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
    <div>
      {isLoggedIn ? (
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
            <Route path="/employee-history/:id" element={<EmployeeHistory />} />
            <Route path="/create-account" element={<CreateAccount />} /> {/* Route for CreateAccount */}
            <Route path="/user-general" element={<UserGeneralPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LayoutWithNavigation>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}