import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Avatar, Grid, TextField, FormControl, FormControlLabel, Switch,
  InputLabel,Select,MenuItem,Button } from '@mui/material';
import API from './api';

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try { 
        const token = localStorage.getItem('token');
        if (token) {
          API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await API.get('/profile');
          console.log("API Response:", response.data); // Log the response data
  
          setUserProfile({
            ...response.data,
            accountStatus: response.data.account_status, // Adjust field names as needed
            isAdmin: response.data.is_admin, // Adjust field names as needed
          });
        } else {
          setError("Authentication token not found");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user data");
      }
      setLoading(false);
    };
  
    fetchUserProfile();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

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
      <Typography variant="h5" gutterBottom>User Details</Typography>
      <Paper sx={{ p: 2 }}>
        <Box sx={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mb: 2 
        }}>
          <Avatar src={userProfile.profilePicture || ''} sx={{ width: 122, height: 122, mb: 2 }} />
          {/* Buttons like 'History' or 'Edit' can be added here if relevant */}
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
              value={userProfile.first_name || ''}
              InputProps={{ readOnly: true }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="last_name"
              label="Last Name"
              value={userProfile.last_name || ''}
              InputProps={{ readOnly: true }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone_number"
            label="Phone Number"
            value={userProfile.phone_number || ''}
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            value={userProfile.address || ''}
            InputProps={{ readOnly: true }} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="zipcode"
            label="Zip Code"
            value={userProfile.zipcode || ''}
            InputProps={{ readOnly: true }} 
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
              name="position"
              label="Position"
              value={userProfile.position || ''}
              InputProps={{ readOnly: true }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="employeeId"
            label="Employee ID"
            value={userProfile.employeeid || ''}
            InputProps={{ readOnly: true }} 
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
              name="emergency_contract_name"
              label="First Name"
              value={userProfile.emergency_contract_name || ''}
              InputProps={{ readOnly: true }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="emergency_contract_surname"
              label="Last Name"
              value={userProfile.emergency_contract_surname || ''}
              InputProps={{ readOnly: true }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="emergency_contract_telephone"
              label="Phone Number"
              value={userProfile.emergency_contract_telephone || ''}
              InputProps={{ readOnly: true }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              fullWidth
              name="emergency_contract_relation"
              label="Relation"
              value={userProfile.emergency_contract_relation || ''}
              InputProps={{ readOnly: true }} 
            />
          </Grid>
          {/* ... Other fields for emergency contact ... */}
        </Grid>
        <Typography variant="h6" sx={{ mt: 2 }}>Account Status</Typography>
<FormControl fullWidth margin="normal">
  <InputLabel id="account-status-label">Account Status</InputLabel>
  <Select
    labelId="account-status-label"
    name="accountStatus"
    value={userProfile.accountStatus || ''} // Now using adjusted state property
    InputProps={{ readOnly: true }} 
    style={{ backgroundColor: getStatusColor(userProfile.accountStatus) }}
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
      checked={userProfile.isAdmin || false} // Now using adjusted state property
      name="isAdmin"
      InputProps={{ readOnly: true }} 
    />
  }
  label={userProfile.is_Admin ? "Admin" : "Regular User"}
/>
      </Paper>
    </Container>
  );
  
  
};

export default UserProfilePage;
