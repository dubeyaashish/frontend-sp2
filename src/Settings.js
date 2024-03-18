import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, TextField, MenuItem,
  FormControl, InputLabel, Select, Button, Grid, Autocomplete,
  Card,CardContent,CardActions,IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import API from './api';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const SettingsPage = () => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [startDay, setStartDay] = useState('Monday');
  const [endDay, setEndDay] = useState('Friday');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [savedEmployees, setSavedEmployees] = useState([])
  const removeEmployee = (id) => {
    setSavedEmployees(savedEmployees.filter(employee => employee.id !== id));
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await API.get('/admin/user'); // Using Axios instance
        setEmployeeList(response.data); // Assuming the response data is an array of employees
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Handlers
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleStartDayChange = (event) => {
    setStartDay(event.target.value);
  };

  const handleEndDayChange = (event) => {
    setEndDay(event.target.value);
  };

  const handleEmployeeSearch = (event, value) => {
    setSelectedEmployees(value);
  };

  const handleSettingsChange = async () => {
  //   // Construct the settings object
  //   const settings = {
  //     startTime,
  //     endTime,
  //     startDay,
  //     endDay,
  //     selectedEmployees // Assuming you only need the employee IDs
  //   };
  //   try {
  //     // Replace '/admin/settings' with the correct endpoint for your backend
  //     const response = await API.post('/admin/settings', settings);
  //     if (response.status === 200) {
  //       setSavedEmployees(selectedEmployees);
  //       alert('Settings saved successfully');
  //     } else {
  //       alert('Failed to save settings');
  //     }
  //   } catch (error) {
  //     console.error('Error saving settings:', error);
  //     alert('An error occurred while saving settings');
  //   }
  // };

    // Mock the saving of settings
    setSavedEmployees(selectedEmployees);
    // Normally here you would send the data to your backend
    console.log('Settings saved:', { startTime, endTime, startDay, endDay, selectedEmployees });
  };
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Working time limit
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={3}>
            <TextField
              id="start-time"
              label="Start"
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="end-time"
              label="Finish"
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="start-day-select-label">Start Day</InputLabel>
              <Select
                labelId="start-day-select-label"
                id="start-day-select"
                value={startDay}
                label="Start Day"
                onChange={handleStartDayChange}
              >
                {daysOfWeek.map((day) => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="end-day-select-label">End Day</InputLabel>
              <Select
                labelId="end-day-select-label"
                id="end-day-select"
                value={endDay}
                label="End Day"
                onChange={handleEndDayChange}
              >
                {daysOfWeek.map((day) => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Employees
      </Typography>
      <Autocomplete
        multiple
        id="employee-search"
        options={employeeList}
        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
        onChange={handleEmployeeSearch}
        renderInput={(params) => (
          <TextField {...params} label="Select Employees" placeholder="Search..." />
        )}

        
      />
            <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleSettingsChange}>Save Changes</Button>
      </Box>
      {/* Display saved employees in square cards */}
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {savedEmployees.map((employee) => (
          <Card key={employee.id} sx={{
            width: 128, // This width and height make the card square
            height: 128,
            position: 'relative',
            '&:hover .close-icon': {
              display: 'block',
            }
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: 14 }}>
                {employee.workingHours}
              </Typography>
              <Typography variant="body2">
                {`${employee.first_name} ${employee.last_name}`}
              </Typography>
            </CardContent>
            <CardActions sx={{ position: 'absolute', top: 0, right: 0 }}>
              <IconButton 
                className="close-icon"
                sx={{ display: 'none' }}
                onClick={() => removeEmployee(employee.id)}
              >
                <CloseIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SettingsPage;