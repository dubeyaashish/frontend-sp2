import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    zipCode: '',
    email: '',
    employeeId: '',
    position: '',
    emergencyFirstName: '',
    emergencyLastName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    accountStatus: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAccount({ ...account, [name]: value });
  };

  // Function to change background color based on account status
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
  const ColorSelect = styled(Select)(({ theme, statuscolor }) => ({
    '& .MuiSelect-select': {
      backgroundColor: statuscolor,
      color: theme.palette.getContrastText(statuscolor),
    },
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement submission logic here...
    console.log(account);
    // navigate('/accounts'); // Navigate to accounts listing page after submission
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Account
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        
      <Typography variant="h6">Personal Information</Typography>
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    <TextField
      margin="normal"
      required
      fullWidth
      name="firstName"
      label="First Name"
      value={account.firstName}
      onChange={handleInputChange}
    />
  </Grid>
  <Grid item xs={12} md={6}>
    <TextField
      margin="normal"
      required
      fullWidth
      name="lastName"
      label="Last Name"
      value={account.lastName}
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
      value={account.phone}
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
      value={account.address}
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
      value={account.zipCode}
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
      value={account.email}
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
      value={account.employeeId}
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
      value={account.position}
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
      value={account.emergencyFirstName}
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
      value={account.emergencyLastName}
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
      value={account.emergencyPhone}
      onChange={handleInputChange}
    />
  </Grid>
  <Grid item xs={12} md={6}>
    <TextField
      margin="normal"
      fullWidth
      name="emergencyRelation"
      label="Relation"
      value={account.emergencyRelation}
      onChange={handleInputChange}
    />
  </Grid>
</Grid>

        <Typography variant="h6" sx={{ mt: 2 }}>Account Status</Typography>
        <FormControl fullWidth margin="normal">
            <InputLabel id="account-status-label">Account Status</InputLabel>
                <Select
                    labelId="account-status-label"
                    name="accountStatus"
                    value={account.accountStatus}
                    onChange={handleInputChange}
                    style={{ backgroundColor: getStatusColor(account.accountStatus) }}
                >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Paid leave">Paid leave</MenuItem>
                <MenuItem value="Dismissed">Dismissed</MenuItem>
                <MenuItem value="Suspended">Suspended</MenuItem>
            </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button type="submit" variant="contained">Save</Button>
        </Box>
      </Box>
    </Container>
      
  );
};

export default CreateAccount;
