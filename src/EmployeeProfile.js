import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Paper, Avatar, Grid, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import API from './api'; // Your Axios instance

const EmployeeProfile = () => {
  const { id } = useParams(); // Using 'id' here instead of 'employeeid'
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await API.get(`/admin/user/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Employee Details</Typography>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Avatar src={employee?.profilePicture || ''} sx={{ width: 122, height: 122 }} />
        </Box>

        <Typography variant="h6">Personal Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="First Name" value={employee?.first_name || ''} fullWidth margin="normal" InputProps={{ readOnly: true }}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Last Name" value={employee?.last_name || ''} fullWidth margin="normal" InputProps={{ readOnly: true }}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Phone Number" value={employee?.phone || ''} fullWidth margin="normal" InputProps={{ readOnly: true }}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Email" value={employee?.email || ''} fullWidth margin="normal" InputProps={{ readOnly: true }}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Address" value={employee?.address || ''} fullWidth margin="normal" InputProps={{ readOnly: true }}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Zip Code" value={employee?.zipCode || ''} fullWidth margin="normal" InputProps={{ readOnly: true }}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Employee ID" value={employee?.employeeid || ''} fullWidth margin="normal" InputProps={{ readOnly: true }}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Position" value={employee?.position || ''} fullWidth margin="normal" InputProps={{ readOnly: true }}/>
          </Grid>
          {/* Add any additional fields here in a similar manner */}
        </Grid>
      </Paper>
    </Container>  
  );
};

export default EmployeeProfile;
