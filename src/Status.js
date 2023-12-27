import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, InputAdornment, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Assume this is the data you're working with
const initialRows = [
  { id: 6316820, name: 'Prabodhan Fitzgerald', position: 'Sales', status: 'Active', checkedIn: '08:42:02', checkedOut: '-' },
  // ... more rows
];

export default function StatusPage() {
  const [rows, setRows] = useState(initialRows);
  const [searchText, setSearchText] = useState('');

  // Filter rows based on the search text
  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'flex-start', // Aligns content to the top
      paddingTop: '64px', // Adds space from the top of the viewport
      height: '100vh', // Takes full height of the viewport
    }}>
      <Paper sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', overflow: 'hidden', padding: 2 }}>
        <TextField
          id="search-field"
          label="Search"
          type="search"
          variant="outlined"
          fullWidth // Makes the TextField take the full width of its parent
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2 }} // Adds space below the search bar
        />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Checked In</TableCell>
                <TableCell>Checked Out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.checkedIn}</TableCell>
                  <TableCell>{row.checkedOut}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
