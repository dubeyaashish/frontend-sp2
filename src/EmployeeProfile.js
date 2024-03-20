import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Paper, Avatar, Grid, TextField, FormControl, FormControlLabel, Switch,
InputLabel,Select,MenuItem } from '@mui/material';
import API from './api';

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) {
        setError("No ID provided");
        setLoading(false);
        return;
      }
      try {
        const response = await API.get(`/admin/user/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setError("Failed to load employee data");
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!employee) {
    return <Typography>No employee data available.</Typography>;
  }

  // ... rest of your component

  const handleInputChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  };

  const handleToggleChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.checked });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#4caf50'; // Green
      case 'Paid leave':
        return '#2196f3'; // Blue
      case 'Dismissed':
        return '#f44336'; // Red
      case 'Suspended':
        return '#ff9800'; // Orange
      default:
        return '#ffffff'; // Default to white or any other color you prefer
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Employee Details</Typography>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Avatar src={employee.profilePicture || ''} sx={{ width: 122, height: 122 }} />
        </Box>

      <Typography variant="h6">Personal Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="first_name"
            label="First Name"
            value={employee.first_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="last_name"
            label="Last Name"
            value={employee.last_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone Number"
            value={employee.phone_number}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            value={employee.address}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="zipCode"
            label="Zip Code"
            value={employee.zipcode}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 2 }}>Position</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            value={employee.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="employeeId"
            label="Employee ID"
            value={employee.employeeid}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="position"
            label="Position"
            value={employee.position}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 2 }}>Emergency Contact</Typography>
      <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="emergencyFirstName"
        label="First Name"
        value={employee.emergency_contract_name}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="emergencyLastName"
        label="Last Name"
        value={employee.emergency_contract_surname}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="emergencyPhone"
        label="Phone Number"
        value={employee.emergency_contract_telephone}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        margin="normal"
        fullWidth
        name="emergencyRelation"
        label="Relation"
        value={employee.emergency_contract_relation}
        onChange={handleInputChange}
      />
    </Grid>
        {/* Add Emergency Contact fields here, similar to the above pattern */}
      </Grid>

      <Typography variant="h6" sx={{ mt: 2 }}>Account Status</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="account-status-label">Account Status</InputLabel>
          <Select
            labelId="account-status-label"
            name="accountStatus"
            value={employee.accountStatus}
            onChange={handleInputChange}
            style={{ backgroundColor: getStatusColor(employee.accountStatus) }}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Paid leave">Paid leave</MenuItem>
            <MenuItem value="Dismissed">Dismissed</MenuItem>
            <MenuItem value="Suspended">Suspended</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" sx={{ mt: 2 }}>Admin</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={employee.isAdmin || false}
              onChange={handleToggleChange}
              name="isAdmin"
            />
          }
          label={employee.isAdmin ? "Admin" : "Regular User"}
        />

      </Paper>
    </Container>
);

};

export default EmployeeProfile;
