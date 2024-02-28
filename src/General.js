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
  Avatar,
  Typography,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PieChart, Pie, Legend, Tooltip as RechartTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase/config';
import API from './api'; // Import your Axios instance

// Initialize Firebase app and get Firestore database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const GeneralPage = () => {
  const [employees, setEmployees] = useState([]);
  const [chartData, setChartData] = useState({
    daily: [], // Data for the daily pie chart
    weekly: [], // Data for the weekly bar chart
  });


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeResponse = await API.get('/admin/user'); // Endpoint for Employees
        const checkInResponse = await API.get('/CheckIns'); // Endpoint for CheckIns
  
        const employees = employeeResponse.data.reduce((acc, employee) => {
          acc[employee.employeeId] = { name: employee.first_name + ' ' + employee.last_name, position: employee.position };
          return acc;
        }, {});
  
        const combinedData = checkInResponse.data.map(checkIn => {
          return { 
            ...employees[checkIn.employeeId], 
            checkInTime: checkIn.checkInTime // Assuming 'checkInTime' is a field in CheckIns
          };
        });
  
        setEmployees(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchEmployees();
  }, []);

  return (
    <Box>
      {/* Top bar with user info */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          backgroundColor: "#fff", // Or any color you want
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6">Dashboard</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="subtitle1">Carolina Monteiro | Admin</Typography>
          <Avatar
            sx={{
              bgcolor: "grey.200",
              color: "text.primary",
            }}
          >
            CM
          </Avatar>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
      {/* Charts */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          gap: 2,
        }}
      >
        {/* Pie Chart for Today's Check In and Check Out */}
        <Paper sx={{ width: '300px', p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Today's Data
          </Typography>
          <PieChart width={200} height={200}>
            <Pie data={chartData.daily} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
            <RechartTooltip />
            <Legend />
          </PieChart>
        </Paper>

        {/* Bar Chart for Weekly Employee Check In */}
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Weekly Employee Check In
          </Typography>
          <BarChart width={500} height={300} data={chartData.weekly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="checkIn" fill="#8884d8" />
            <Bar dataKey="checkOut" fill="#82ca9d" />
          </BarChart>
        </Paper>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Check In</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell component="th" scope="row">
                {employee.first_name + ' ' + employee.last_name} {/* Adjust if your data structure is different */}
              </TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.checkInTime}</TableCell> {/* Display check-in time */}
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GeneralPage;