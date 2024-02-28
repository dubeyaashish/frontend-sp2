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
import {
  PieChart,
  Pie,
  Legend,
  Tooltip as RechartTooltip,
  Cell, // Import Cell
  ResponsiveContainer, // Import ResponsiveContainer
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import API from './api'; // Import your Axios instance


const GeneralPage = () => {
  const [employees, setEmployees] = useState([]);
  const [chartData, setChartData] = useState({
    daily: [], // Data for the daily pie chart
    weekly: [] // Data for the weekly bar chart
  });


  useEffect(() => {
    const fetchEmployeesAndCheckIns = async () => {
      try {
        const employeeResponse = await API.get('/admin/user');
        const checkInResponse = await API.get('/admin/checkin');

        const employeeMap = new Map();
        employeeResponse.data.forEach(emp => {
          employeeMap.set(emp.id, {
            name: emp.first_name + ' ' + emp.last_name,
            position: emp.position
          });
        });

        const combinedData = checkInResponse.data.map(checkIn => {
          const employee = employeeMap.get(checkIn.id);
          return {
            ...employee,
            checkInTime: checkIn.checkedIn || 'Not available',
            checkOutTime: checkIn.checkedOut || '-'
          };
        });

        const today = new Date();
        const todayCheckIns = checkInResponse.data.filter(checkIn => {
          const checkInDate = new Date(checkIn.date);
          return checkInDate.toDateString() === today.toDateString();
        }).length;

        const dailyData = [
          { name: "Checked In Today", value: todayCheckIns },
          { name: "Not Checked In", value: employeeResponse.data.length - todayCheckIns }
        ];

        const weeklyCheckIns = {
          Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0
        };

        checkInResponse.data.forEach(checkIn => {
          const checkInDate = new Date(checkIn.date);
          const day = checkInDate.toLocaleDateString('en-US', { weekday: 'short' });
          weeklyCheckIns[day]++;
        });

        const weeklyData = Object.keys(weeklyCheckIns).map(day => ({
          day: day,
          checkIns: weeklyCheckIns[day]
        }));

        setChartData({ daily: dailyData, weekly: weeklyData });
        setEmployees(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEmployeesAndCheckIns();
  }, []);


  const COLORS = ['#4caf50', '#f44336'];

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
          <Paper sx={{ width: '100%', maxWidth: 360, mx: 'auto', p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Today's Data
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie 
                data={chartData.daily} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80}
                // label is removed here
              >
                {
                  chartData.daily.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))
                }
              </Pie>
              <RechartTooltip />
              <Legend 
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{ bottom: -10 }}
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Weekly Employee Check In
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData.weekly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend align="center" verticalAlign="bottom" wrapperStyle={{ bottom: -10 }} iconSize={10} />
              <Bar dataKey="checkIns" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
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
            <TableCell>Check Out</TableCell> {/* New column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {employee.name}
              </TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.checkInTime}</TableCell>
              <TableCell>{employee.checkOutTime}</TableCell> {/* Display check-out time */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Box>
  );
};

export default GeneralPage;