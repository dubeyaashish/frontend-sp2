
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
  TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
  Tooltip,
  Text
} from 'recharts';
import API from './api'; // Import your Axios instance


const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
  const [day, date] = payload.value.split(' ');

  return (
    <g transform={`translate(${x},${y})`}>
      <Text x={0} y={0} dy={16} textAnchor="end" fill="#666" fontSize={10} transform="rotate(-35)">
        {day}
      </Text>
      <Text x={0} y={0} dy={30} textAnchor="end" fill="#666" fontSize={10} transform="rotate(-35)">
        {date}
      </Text>
    </g>
  );
};

const Pagination = ({ employeesPerPage, totalEmployees, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalEmployees / employeesPerPage);

  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px' }}>
      <IconButton
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography>{currentPage}</Typography>
      <IconButton
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};


const GeneralPage = () => {
  const [employees, setEmployees] = useState([]);
  const [chartData, setChartData] = useState({
    daily: [], // Data for the daily pie chart
    weekly: [] // Data for the weekly bar chart
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showTopCheckIns, setShowTopCheckIns] = useState(false);
  const employeesPerPage = 3;


  useEffect(() => {
    const fetchEmployeesAndCheckIns = async () => {
      try {
        const employeeResponse = await API.get('/admin/user');
        const checkInResponse = await API.get('/admin/checkin');
    
        const todayString = new Date().toDateString(); // Get today's date as a string
    
        const employeeMap = new Map();
        employeeResponse.data.forEach(emp => {
          employeeMap.set(emp.id, {
            name: emp.first_name + ' ' + emp.last_name,
            position: emp.position,
            employeeid: emp.employeeid,
            faceAdded: emp.faceAdded
          });
        });

        const combinedData = checkInResponse.data.filter(checkIn => {
          const checkInDateString = new Date(checkIn.checkedIn).toDateString();
          return checkInDateString === todayString;
        }).map(checkIn => {
          const employee = employeeMap.get(checkIn.employeeId);
          return {
            ...employee,
            checkInTime: new Date(checkIn.checkedIn).toLocaleTimeString(),
            checkOutTime: checkIn.checkedOut ? new Date(checkIn.checkedOut).toLocaleTimeString() : '-'
          };
        });
  
        setEmployees(combinedData); // Now includes data with today's check-ins and check-outs

        const today = new Date();
        const todayCheckIns = checkInResponse.data.filter(checkIn => {
          const checkInDate = new Date(checkIn.date);
          return checkInDate.toDateString() === today.toDateString();
        }).length;

        const dailyData = [
          { name: "Present", value: todayCheckIns },
          { name: "Absent", value: employeeResponse.data.length - todayCheckIns }
        ];

        const getStartOfWeek = (date) => {
          const start = new Date(date);
          start.setDate(start.getDate() - start.getDay() + (start.getDay() === 0 ? -6 : 1)); // set to Monday
          return start;
        };
  
        const formatDate = (date) => {
          return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        };
  
        const startOfWeek = getStartOfWeek(today);
  
        const weeklyCheckIns = Array.from({ length: 7 }).map((_, index) => {
          const dayDate = new Date(startOfWeek);
          dayDate.setDate(dayDate.getDate() + index);
          return { day: dayDate.toLocaleDateString('en-US', { weekday: 'short' }), date: formatDate(dayDate), count: 0 };
        });
  
        checkInResponse.data.forEach(checkIn => {
          const checkInDate = new Date(checkIn.date);
          const index = checkInDate.getDay() - (checkInDate.getDay() === 0 ? -6 : 1);
          if (index >= 0 && index < 7 && checkInDate >= startOfWeek) {
            weeklyCheckIns[index].count++;
          }
        });
  
        const weeklyData = weeklyCheckIns.map(day => ({
          day: `${day.day} (${day.date})`,
          Present: day.count
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

    const toggleDisplayMode = () => {
      setShowTopCheckIns(!showTopCheckIns);
    };

    const getTodaysDate = () => {
      const today = new Date();
      return today.toISOString().split('T')[0]; // returns date in YYYY-MM-DD format
    };

    const displayedEmployees = showTopCheckIns 
      ? employees.filter(emp => emp.checkInTime && emp.checkInTime.startsWith(getTodaysDate())).slice(0, 5) 
      : employees;


      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value || '');
        setCurrentPage(1); // Reset to first page on new search
    };
    

    let filteredEmployees = employees.filter(employee => {
      const name = employee.name || "";
      const employeeId = employee.employeeid || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             employeeId.includes(searchTerm);
    });
    

    console.log("Employees: ", employees);
    console.log("Search term: ", searchTerm);

    
    
    // Pagination Logic
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
            <XAxis dataKey="day" height={60} tick={<CustomizedAxisTick />} interval={0} />
            <YAxis />
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" wrapperStyle={{ bottom: -10 }} iconSize={10} />
            <Bar dataKey="Present" fill="#4caf50" />
          </BarChart>
          </ResponsiveContainer>
        </Paper>

      </Box>

      <Box sx={{ padding: '10px' }}>
     <TextField
        label="Search Employees"
        variant="outlined"
        size="small"
        onChange={handleSearchChange}
      />
    </Box>
      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Check in</TableCell>
              <TableCell>Check out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentEmployees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, width: 24, height: 24 }} src={employee.faceAdded ? `URL_TO_PROFILE_PICTURE/${employee.employeeid}` : `URL_TO_PLACEHOLDER_IMAGE`}/>
                  {employee.name}
                </TableCell>
                <TableCell>{employee.employeeid}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.checkInTime}</TableCell>
                <TableCell>{employee.checkOutTime}</TableCell>
              </TableRow>
            ))}
            {currentEmployees.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination 
            employeesPerPage={employeesPerPage} 
            totalEmployees={filteredEmployees.length} 
            paginate={paginate}
            currentPage={currentPage}
          />
      </TableContainer>
    </Box>
  );
};

export default GeneralPage;
