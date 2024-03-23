import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import { Box, Container, Typography, Paper, Avatar, Grid, TextField, FormControl, FormControlLabel, Switch,
InputLabel,Select,MenuItem,Button } from '@mui/material';
import API from './api';



const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) {
        setError("No ID provided");
        setLoading(false);
        return;
      }
      try {
        const response = await API.get(`/admin/user/${id}`);
        const fetchedData = response.data;
        setEmployee({
          ...fetchedData,
          isAdmin: fetchedData.is_admin, // Assuming this is the correct property name
          accountStatus: fetchedData.account_status // Assuming this is the correct property name
        });
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

  const handleEmployeeHistory = () => {
    navigate(`/employee-history/${id}`); // Using the employee's ID in the path
  }
  
  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
    
  };
  
  const handleSaveChanges = async () => {
    const employeeData = {
      first_name: employee.first_name,
      last_name: employee.last_name,
      address: employee.address,
      phone_number: employee.phone_number,
      email: employee.email,
      position: employee.position,
      zipcode: employee.zipcode,
      emergency_contract_name: employee.emergency_contract_name,
      emergency_contract_surname: employee.emergency_contract_surname,
      emergency_contract_telephone: employee.emergency_contract_telephone,
      emergency_contract_relation: employee.emergency_contract_relation,
      employeeid: employee.employeeid,
      is_admin: employee.is_admin,
      account_status: employee.account_status,
      profile_image_url: employee.profile_image_url // Include if you have profile image update functionality
    };
  
    try {
      // Perform async request
      const response = await API.post(`/admin/user/${id}`, employeeData);
      setDialogOpen(true);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

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
      <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mb: 2 
      }}>
      <Avatar src={employee.profilePicture || ''} sx={{ width: 122, height: 122, mb: 2 }} />
      <Button variant="contained" onClick={handleEmployeeHistory}>History</Button><br></br>
      <Button variant="contained" onClick={handleEditClick}>Edit</Button>
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
            disabled={!isEditMode}
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
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone_number"
            label="Phone Number"
            value={employee.phone_number}
            onChange={handleInputChange}
            disabled={!isEditMode}
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
            disabled={!isEditMode}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="zipcode"
            label="Zip Code"
            value={employee.zipcode}
            onChange={handleInputChange}
            disabled={!isEditMode}
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
            disabled={!isEditMode}
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
            disabled={!isEditMode}
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
            disabled={!isEditMode}
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
        value={employee.emergency_contract_name}
        onChange={handleInputChange}
        disabled={!isEditMode}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="emergency_contract_surname"
        label="Last Name"
        value={employee.emergency_contract_surname}
        onChange={handleInputChange}
        disabled={!isEditMode}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="emergency_contract_telephone"
        label="Phone Number"
        value={employee.emergency_contract_telephone}
        onChange={handleInputChange}
        disabled={!isEditMode}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <TextField
        margin="normal"
        fullWidth
        name="emergency_contract_relation"
        label="Relation"
        value={employee.emergency_contract_relation}
        onChange={handleInputChange}
        disabled={!isEditMode}
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
          value={employee.accountStatus || ''} // Default to empty string if not available
          onChange={handleInputChange}
          disabled={!isEditMode}
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
          name="isAdmin" // Make sure this matches the state property name
          disabled={!isEditMode}
        />
        }
        label={employee.isAdmin ? "Admin" : "Regular User"}
      />

      </Paper>
      {isEditMode && (
        <Button alignItems="right" variant="contained" color="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      )}

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Information Saved</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
);

};

export default EmployeeProfile;
