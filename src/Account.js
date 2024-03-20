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
import { useNavigate } from 'react-router-dom'; // if using react-router for navigation
import API from './api'; // Import your Axios instance

const AccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate(); // if using react-router for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using the Axios instance to make the API call
        const response = await API.get('/admin/user');
        setAccounts(response.data);
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
      <TableHead sx={{ backgroundColor: '#EEBD77' }}>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Position</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Account Status</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}></TableCell> {/* For SEE MORE */}
        </TableRow>
      </TableHead>
          <TableBody>
          {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell component="th" scope="row">
              {account.first_name + ' ' + account.last_name}
            </TableCell>
            <TableCell>{account.employeeid}</TableCell>
            <TableCell>{account.position}</TableCell>
            <TableCell>{account.account_status}</TableCell>
            <TableCell>
              {/* Additional actions */}
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
