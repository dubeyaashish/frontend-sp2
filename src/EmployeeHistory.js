import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TextField, Button 
} from '@mui/material';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Download } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import API from './api';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EmployeeHistory = () => {
    const { id } = useParams();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterDate, setFilterDate] = useState('');
    

    const rowsPerPage = 15;
  
    useEffect(() => {
        const fetchHistoryAndEmployeeData = async () => {
          try {
            const employeeResponse = await API.get('/admin/user');
            const checkInResponse = await API.get(`/admin/checkin`);
            
            // Filter and map check-in data to include employee names
            const employeeMap = new Map();
            employeeResponse.data.forEach(emp => {
              employeeMap.set(emp.id, { 
                firstName: emp.first_name, 
                lastName: emp.last_name,
                employeeid: emp.employeeid
              });
            });
      
            const employeeHistory = checkInResponse.data
              .filter(item => item.uid === id)
              .map(item => ({
                ...item,
                ...employeeMap.get(item.uid)
              }));
      
            setHistory(employeeHistory);
          } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data");
          } finally {
            setLoading(false);
          }
        };
      
        fetchHistoryAndEmployeeData();
      }, [id]);
    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
      };

      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      
      const handleDownload = () => {
        // Convert the currently displayed data to a worksheet
        const ws = XLSX.utils.json_to_sheet(paginatedData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, 'employee_history' + fileExtension);
      };
      const filteredData = history.filter(item => {
        const firstName = item.first_name || "";
        const lastName = item.last_name || "";
        const employeeId = item.employeeid ? item.employeeid.toString() : "";
        
        // If filterDate is set, we include it in our filtering criteria
        const matchesDate = filterDate ? new Date(item.date).toDateString() === filterDate.toDateString() : true;
      
        return (
          matchesDate &&
          (firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employeeId.includes(searchTerm))
        );
      });
      
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      );
      return (
        <Container maxWidth="lg">
          {/* Search and Download Buttons */}
          <Box display="flex" justifyContent="space-between" my={2} alignItems="center">
  <Box display="flex" gap={2}>
            <TextField 
              label="Search" 
              variant="outlined" 
              value={searchTerm}
              onChange={handleSearchChange}
              
            />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                label="Filter by Date"
                value={filterDate}
                onChange={(newValue) => {
                    setFilterDate(newValue);
                    setCurrentPage(1);
                }}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            </Box>
                <IconButton onClick={handleDownload}>
                <Download />
                </IconButton>

          </Box>
          
    
          {/* Table for Employee History */}
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Check In</TableCell>
                  <TableCell>Check out</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {paginatedData.map((row, index) => (
                    <TableRow key={index}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{`${row.firstName || ''} ${row.lastName || ''}`.trim()}</TableCell>
                    <TableCell>{row.employeeid}</TableCell>
                    <TableCell>{row.checkedIn}</TableCell>
                    <TableCell>{row.checkedOut}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="flex-end" my={2}>
            <IconButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                <ArrowBackIos />
            </IconButton>
            <IconButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * rowsPerPage >= filteredData.length}>
                <ArrowForwardIos />
            </IconButton>
            </Box>
          </Paper>
        </Container>
      );
    };
    
    export default EmployeeHistory;