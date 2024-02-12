import React from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Typography, IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UserGeneralPage = () => {

  // Mock data for the table
  const mockTableData = [
    { id: 1, name: 'Prabodhan Fitzgerald', position: 'Manager', status: 'Active' },
    { id: 2, name: 'Hiro Joyce', position: 'Sales', status: 'Active' },
    { id: 3, name: 'Lloyd Jefferson', position: 'Senior Executive', status: 'Inactive' },
    // Add more mock data as needed
  ];

  return (
    <Box>
      {/* Top bar with user info */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        backgroundColor: '#fff', // Or any color you want
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h6">
          Dashboard
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
          <Typography variant="subtitle1">
            Carolina Monteiro | Admin
          </Typography>
          <Avatar sx={{
            bgcolor: 'grey.200',
            color: 'text.primary',
          }}>
            CM
          </Avatar>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mockup table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserGeneralPage;
