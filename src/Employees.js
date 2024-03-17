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
import { useNavigate } from 'react-router-dom';
import API from './api';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get('/admin/user');
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  const handleSeeMore = (employeeId) => {
    navigate(`/employee-profile/${employeeId}`); // Adjust the path as needed
  };

  return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
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
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell component="th" scope="row">
                  {employee.first_name + ' ' + employee.last_name}
                </TableCell>
                <TableCell>{employee.employeeid}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  {/* Placeholder for Account Status */}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    onClick={() => handleSeeMore(employee.employeeid)}
                  >
                    See More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeePage;
