  import React, { useState, useEffect } from 'react';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Typography, Pagination } from '@mui/material';
  import SearchIcon from '@mui/icons-material/Search';

  import API from './api'; // Adjust the import path as needed

  const UserHistoryPage = () => {
      const [checkInData, setCheckInData] = useState([]);
      const [userId, setUserId] = useState(null);
      const [searchTerm, setSearchTerm] = useState('');
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [totalPages, setTotalPages] = useState(0);
      const [currentPage, setCurrentPage] = useState(1);
      const rowsPerPage = 10;

      useEffect(() => {
          const auth = getAuth();
          onAuthStateChanged(auth, (user) => {
            if (user) {
              setUserId(user.uid);
              fetchCheckInData(user.uid);
            } else {
              setError("No user is logged in");
              setLoading(false);
            }
          });
        }, []);
      
        const fetchCheckInData = async (uid) => {
          try {
            const response = await API.get(`/admin/checkin/${uid}`);
            console.log('Fetched data:', response.data); // Debug log
            setCheckInData(response.data);
          } catch (error) {
            console.error("Error fetching check-in data for user:", error);
            setError("Failed to load check-in data for user");
          } finally {
            setLoading(false);
          }
        };
    const filteredData = checkInData.filter(entry => 
      entry?.employeeid?.includes(searchTerm) || 
      entry?.date?.includes(searchTerm)
    );

    useEffect(() => {
      setTotalPages(Math.ceil(filteredData.length / rowsPerPage));
    }, [filteredData]); // Recalculate total pages when filteredData changes
    if (loading) {
      return <Typography>Loading...</Typography>;
    }

    if (error) {
      return <Typography>Error: {error}</Typography>;
    }




    const handleChangePage = (event, newPage) => {
      setCurrentPage(newPage);
    };

    

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    // Calculate the data to be displayed on the current page
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
      <Container maxWidth="lg" sx={{ mx: 'auto'}}>
        <Typography variant="h4" sx={{ my: 2 }}>History</Typography>
        <Box sx={{ mb: 2 }}>
          <TextField label="Search" variant="outlined" onChange={handleSearchChange} />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.checkedIn}</TableCell>
                  <TableCell>{row.checkedOut}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination Controls */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination 
            count={totalPages} 
            page={currentPage} 
            onChange={handleChangePage} 
            color="primary"
          />
        </Box>
      </Container>
    );
  };

  export default UserHistoryPage;
