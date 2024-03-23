import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, Typography, LinearProgress, Grid, Container, Pagination
} from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import API from './api';

const UserGeneralPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        API.get(`/admin/checkin`) // Fetch all check-in data
          .then(response => {
            // Filter data for the logged-in user by comparing uid
            const userCheckIns = response.data.filter(checkIn => checkIn.id === user.uid);
            setAttendanceData(userCheckIns);
          })
          .catch(error => console.error("Error fetching check-in data:", error));
        
        API.get('/profile')
          .then(response => setUserProfile(response.data))
          .catch(error => console.error("Error fetching profile:", error));
      }
    });
  }, []);

  //table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = attendanceData.slice(indexOfFirstRow, indexOfLastRow);


  //dashboard
  const calculateAttendanceStats = () => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const filteredAttendance = attendanceData.filter(data =>
      new Date(data.date) >= firstDayOfMonth
    );

    const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const presentCount = filteredAttendance.length;
    const lateCount = filteredAttendance.filter(data => data.is_late).length;
    const earlyLeaveCount = filteredAttendance.filter(data => data.is_early).length;
    const absentCount = totalDays - presentCount;

    return { totalDays, presentCount, lateCount, earlyLeaveCount, absentCount };
  };


  const { totalDays, presentCount, lateCount, earlyLeaveCount, absentCount } = calculateAttendanceStats();

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
            {userProfile ? `${userProfile.first_name} ${userProfile.last_name} | ${userProfile.employeeid}` : 'Loading...'}
          </Typography>
          <Avatar sx={{
            bgcolor: 'grey.200',
            color: 'text.primary',
          }}>
            {userProfile ? userProfile.first_name[0] : ''}
          </Avatar>
        </Box>
      </Box>

      <Box sx={{ my: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Work Statistics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1">Total Days: {totalDays}</Typography>
              <LinearProgress variant="determinate" value={100} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1">Present: {presentCount}</Typography>
              <LinearProgress variant="determinate" value={(presentCount / totalDays) * 100} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1">Late: {lateCount}</Typography>
              <LinearProgress color="secondary" variant="determinate" value={(lateCount / totalDays) * 100} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1">Early Leave: {earlyLeaveCount}</Typography>
              <LinearProgress color="error" variant="determinate" value={(earlyLeaveCount / totalDays) * 100} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body1">Absent: {absentCount}</Typography>
              <LinearProgress color="error" variant="determinate" value={(absentCount / totalDays) * 100} />
            </Grid>
          </Grid>
        </Box>  

        <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="attendance table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.checkedIn}</TableCell>
                <TableCell>{row.checkedOut}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Pagination 
          count={Math.ceil(attendanceData.length / rowsPerPage)} 
          page={page} 
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
      </Box>
  );
};

export default UserGeneralPage;