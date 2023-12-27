import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, MenuItem,
  FormControl, InputLabel, Select, FormControlLabel, Switch, Button, Grid
} from '@mui/material';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const SettingsPage = () => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [startDay, setStartDay] = useState('Monday');
  const [endDay, setEndDay] = useState('Friday');
  const [notifications, setNotifications] = useState(true);

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

  const handleNotificationsChange = (event) => {
    setNotifications(event.target.checked);
  };

  // Add logic to handle form submission or setting changes
  const handleSettingsChange = () => {
    // Submit to backend or perform other actions
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
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={handleSettingsChange}>Save Changes</Button>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={notifications}
            onChange={handleNotificationsChange}
          />
        }
        label={notifications ? "On" : "Off"}
      />
      {/* ... additional settings ... */}
    </Box>
  );
};

export default SettingsPage;
