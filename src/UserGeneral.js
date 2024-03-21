import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Typography, IconButton, LinearProgress, Grid, Container
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import API from './api';

const UserGeneralPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    // Fetch user profile data using the centralized API
    API.get('/profile')
      .then(response => {
        setUserProfile(response.data);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
      });

    // Fetch weekly data using the centralized API
    API.get('/admin/user') // Adjust this endpoint as needed
      .then(response => {
        // Process the data as needed, possibly filtering for the specific user
        setWeeklyData(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Mock data for work statistics
  const workStatistics = {
    totalDays: 20,
    present: 19,
    late: 1,
    absent: 1
  };

  return (
    <Box sx={{ pt: 2 }}>
      {/* Top bar with user info */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        backgroundColor: '#fff',
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
            {userProfile ? `${userProfile.first_name} ${userProfile.last_name} | ${userProfile.position}` : 'Loading...'}
          </Typography>
          <Avatar sx={{
            bgcolor: 'grey.200',
            color: 'text.primary',
          }}>
            {userProfile ? userProfile.first_name[0] : ''}
          </Avatar>
        </Box>
      </Box>

      {/* Work Statistics Dashboard */}
      <Box sx={{ my: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Work Statistics
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">Total Days: {workStatistics.totalDays}</Typography>
            <LinearProgress variant="determinate" value={100} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Present: {workStatistics.present}</Typography>
            <LinearProgress variant="determinate" value={(workStatistics.present / workStatistics.totalDays) * 100} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Late: {workStatistics.late}</Typography>
            <LinearProgress color="secondary" variant="determinate" value={(workStatistics.late / workStatistics.totalDays) * 100} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Absent: {workStatistics.absent}</Typography>
            <LinearProgress color="error" variant="determinate" value={(workStatistics.absent / workStatistics.totalDays) * 100} />
          </Grid>
        </Grid>
      </Box>

      {/* Mockup table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Account Status</TableCell>
            <TableCell>Check In</TableCell>
            <TableCell>Check Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weeklyData.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.user}
              </TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>{row.accountStatus}</TableCell>
              <TableCell>{row.checkIn}</TableCell>
              <TableCell>{row.checkOut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
  );
};

export default UserGeneralPage;