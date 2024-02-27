  import React, { useState, useRef } from 'react';
  import { Box, Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Avatar,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import { styled } from '@mui/material/styles';
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import axios from 'axios';

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
      profilePicture: '',
    });
    
    const fileInputRef = useRef();

    const isFormValid = () => {
      // Add more fields if necessary
      return account.firstName && account.lastName && account.phone && account.address && account.zipCode
        && account.email && account.employeeId && account.position && account.emergencyFirstName
        && account.emergencyLastName && account.emergencyPhone && account.accountStatus;
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setAccount({ ...account, [name]: value });
    };

    const handleImageUpload = async (file) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `profile_pictures/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setAccount({ ...account, profilePicture: downloadURL });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        handleImageUpload(file);
      }
    };

    const triggerFileInput = () => {
      fileInputRef.current.click();
    };


    const [openDialog, setOpenDialog] = useState(false);



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

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Form Submitted", account); // Add this line for debugging
    
      // Format the data to match the backend's expected structure
      const employeeData = {
        first_name: account.firstName,
        last_name: account.lastName,
        address: account.address,
        phone_number: account.phone,
        email: account.email,
        position: account.position,
        zipcode: account.zipCode,
        emergency_contract_name: account.emergencyFirstName,
        emergency_contract_surname: account.emergencyLastName,
        emergency_contract_telephone: account.emergencyPhone,
        emergency_contract_relation: account.emergencyRelation,
        employeeid: account.employeeId,
        profilePicture: account.profilePicture
      };
    
      try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    // Include the token in the request header
    const response = await axios.post('http://localhost:3001/register', employeeData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log(response.data);
    // rest of your code for successful registration
  } catch (error) {
    console.error("Error during registration: ", error.response || error);
  }
    };
    
    

    return (

          
          <Container maxWidth="md" sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Avatar
                src={account.profilePicture ? account.profilePicture : ''}
                sx={{ width: 122, height: 122, marginRight: 2, cursor: 'pointer' }}
                onClick={triggerFileInput}
              />
              <input
                type="file"
                hidden
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button type="submit" variant="contained" disabled={!isFormValid()}>Save</Button>
        </Box>
      
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
        
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <DialogTitle>Account Created</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The account has been successfully created.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>

      
    );
  };

  export default CreateAccount;