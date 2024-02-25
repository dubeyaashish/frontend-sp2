import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from '@mui/material';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase/config';
import { useNavigate } from 'react-router-dom'; // if using react-router for navigation

// Initialize Firebase app and get Firestore database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate(); // if using react-router for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Accounts")); // Adjust "Accounts" to your Firebase collection name
        const accountData = [];
        querySnapshot.forEach((doc) => {
          accountData.push({ id: doc.id, ...doc.data() });
        });
        setAccounts(accountData);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateAccount = () => {
    navigate('/create-account'); // Adjust the path to where CreateAccount.js is being used
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button variant="contained" onClick={handleCreateAccount}>Create</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Account Status</TableCell>
              <TableCell></TableCell> {/* For SEE MORE */}
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell component="th" scope="row">
                  {account.name} {/* Adjust field names based on your Firebase data */}
                </TableCell>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.position}</TableCell>
                <TableCell>{account.status}</TableCell>
                <TableCell>
                  {/* You can add onClick event to this button to handle "SEE MORE" */}
                  <Button variant="outlined">See More</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AccountPage;
