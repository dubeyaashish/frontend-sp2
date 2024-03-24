import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, TextField, MenuItem,
  FormControl, InputLabel, Select, Button, Grid,
  Card, CardContent, CardActions, IconButton, Autocomplete
} from '@mui/material';
import API from './api';
import CloseIcon from '@mui/icons-material/Close';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase/config';

initializeApp(firebaseConfig);  // Only if not already initialized elsewhere
const firestore = getFirestore();

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const SettingsPage = () => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [startDay, setStartDay] = useState('Monday');
  const [endDay, setEndDay] = useState('Friday');
  const [selectedConfig, setSelectedConfig] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [configList, setConfigList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const configsCollectionRef = collection(firestore, 'Config');
          const configsSnapshot = await getDocs(configsCollectionRef);
          const configsList = configsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
          // Assuming you have an API endpoint to fetch employees
          const employeeResponse = await API.get('/admin/user');
          setEmployeeList(employeeResponse.data);
          setConfigList(configsList);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

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
//Savingconfig
  const handleConfigSave = async () => {
    if (!startTime || !endTime || !startDay || !endDay) {
      alert('Please fill all the settings fields before saving.');
      return;
    }

    const config = {
      startWork: startTime,
      endWork: endTime,
      startDay,
      endDay
    };
    // Assuming you have an API instance set up and the '/setting' endpoint exists
    try {
      const response = await API.post('/setting', config);
      if (response.status === 201) {
        alert('Config saved successfully');
        // Optionally, fetch the new list of configs here if needed
      } else {
        console.error('Failed to save config');
      }
    } catch (error) {
      console.error('Error saving config:', error);
    }
  };
//Savingconfigtoemployee
const handleConfigSelection = (event, value) => {
  setSelectedConfig(value ? value.id : '');
};

const handleEmployeeConfigAssignment = async () => {
  if (!selectedConfig || selectedEmployees.length === 0) {
    alert('Please select a config and at least one employee.');
    return;
  }
  
  const updates = selectedEmployees.map(employee => ({
    id: employee.id,
    config_id: selectedConfig
  }));

  try {
    const response = await API.put('/updateconfig', updates);
    if (response.status === 200) {
      alert('Config assigned to employees successfully');
    } else {
      console.error('Failed to assign config');
    }
  } catch (error) {
    console.error('Error assigning config:', error);
  }
};

const handleEmployeeSearch = (event, value) => {
  setSelectedEmployees(value);
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
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleConfigSave}>
          Save Config
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Select Configuration
      </Typography>
          <Autocomplete
      id="config-search"
      options={configList}
      getOptionLabel={(option) => option.id || ''}
        onChange={handleConfigSelection}
        renderInput={(params) => (
          <TextField {...params} label="Select Config" />
        )}
      />

      {/* Employee selection */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Assign to Employees
      </Typography>
      <Autocomplete
        multiple
        id="employee-search"
        options={employeeList}
        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
        onChange={handleEmployeeSearch}
        renderInput={(params) => (
          <TextField {...params} label="Select Employees" />
        )}
      />

      {/* Save button for config assignment */}
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleEmployeeConfigAssignment}>
          Assign Config to Employees
        </Button>
      </Box>

    </Box>
  );
};

export default SettingsPage;
