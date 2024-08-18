import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, IconButton, Switch } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

function AllUSerDetails() {
    const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1 }); // Initial pagination values
    const [loader, setloader] = useState(false)
    const [csvLoading, setcsvLoading] = useState(false)
    const [userDetails, setUserDetails] = useState([]);
    const getUserData = async () => {
        setloader(true)
        try {
            const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/allxyz`, { params: pagination })
            console.log(data);
            setUserDetails(data?.data.user)
            setPagination(prevPagination => ({
                ...prevPagination,
                totalPages: data.data.totalPages // Update totalPages from the response
            }));
            setloader(false)
        } catch (error) {
            setloader(false)
        }
    }
    console.log(userDetails);

    const [blockStatuses, setBlockStatuses] = useState(() => {
        const storedBlockStatuses = JSON.parse(
            localStorage.getItem('blockStatuses')
        );
        return storedBlockStatuses || {};
    });

    const handleBlockToggle = async (userId) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL} / api / auth / toggleBlock ? userId = ${userId}`
            );

            // Update the local state based on the API response
            setBlockStatuses((prevBlockStatuses) => ({
                ...prevBlockStatuses,
                [userId]: response.data.isBlocked ? 'on' : 'off',
            }));

            // Save the updated block statuses in local storage
            localStorage.setItem(
                'blockStatuses',
                JSON.stringify({
                    ...blockStatuses,
                    [userId]: response.data.isBlocked ? 'on' : 'off',
                })
            );
        } catch (error) {
            console.error('Error toggling block status:', error);
        }
    };

    const columns = [
        { field: 'username', headerName: 'Username', flex: 0.2 },
        { field: 'email', headerName: 'Email', flex: 0.2 },
        { field: 'isVerified', headerName: 'IsVerified', flex: 0.1 },
        { field: 'walletAddress', headerName: 'Wallet Address', flex: 0.2 },
        { field: 'designation', headerName: 'Designation', flex: 0.15 },
        { field: 'portfolio', headerName: 'Portfolio', flex: 0.2 },
        {
            field: 'blockStatus',
            headerName: 'Block/Unblock',
            flex: 0.15,
            renderCell: (params) => (
                <IconButton
                    onClick={() =>
                        handleBlockToggle(params.row.id, params.row.blockStatus)
                    }
                >
                    <Switch
                        checked={blockStatuses[params.row.id] === 'on'}
                        onChange={() =>
                            handleBlockToggle(params.row.id, params.row.blockStatus)
                        }
                    />
                </IconButton>
            ),
        },
        { field: 'isBlocked', headerName: 'Blocked', flex: 0.2 }
    ];

    useEffect(() => {
        getUserData()

    }, [pagination.page]);

    const handlePageChange = (newPage) => {
        setPagination({ ...pagination, page: newPage });
    };

    const handlePrevPage = () => {
        if (pagination.page > 1) {
            handlePageChange(pagination.page - 1);
        }
    };

    const handleNextPage = () => {
        if (pagination.page < pagination.totalPages) {
            handlePageChange(pagination.page + 1);
        }
    };


    const handleExportCSV = async () => {
        try {
            setcsvLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/allxyz`, {
                params: { page: 1, limit: pagination.totalPages * pagination.limit } // Fetch all data without pagination
            });
            // Convert data to CSV format
            const headerRow = 'Username,Email,IsVerified,Wallet Address,Designation,Portfolio,IsBlocked';
            const csvData = response.data.user.map(user => {
                return `${user.username},${user.email},${user.isVerified},${user.walletAddress},${user.designation},${user.portfolio},${user.isBlocked}`;
            }).join('\n');

            // Save CSV file
            const csvContent = `${headerRow}\n${csvData}`;

            const blob = new Blob([csvContent], { type: 'text/csv' });
            saveAs(blob, 'user_data.csv');
            setcsvLoading(false)
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginBottom: "100px" }}>
            <span style={{ fontSize: "15px" }}>All User Data
            </span>
            {loader ? "loading" : <Box sx={{ width: '100%', overflow: "scroll" }}>
                <div>
                    <Button disabled={csvLoading} variant='contained' className='text-lg' onClick={handleExportCSV}>{csvLoading ? "Generating your file please wait" : "Export as CSV"} </Button>
                </div>
                {userDetails.length > 0 && <DataGrid
                    sx={{
                        backgroundColor: 'white',
                        boxShadow: 2,
                        border: 0,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }}
                    rows={userDetails}
                    columns={columns}
                    pageSize={10}
                    rowHeight={60}
                    getRowId={(row) => row._id}

                    onPaginationModelChange={handlePageChange}
                    slots={{ toolbar: GridToolbar }}
                />}

                <div>
                    <Button disabled={pagination.page === 1} onClick={handlePrevPage}>Previous Page</Button>
                    <span>Page {pagination.page} of {pagination.totalPages}</span>
                    <Button disabled={pagination.page === pagination.totalPages} onClick={handleNextPage}>Next Page</Button>
                </div>
            </Box>}
        </div>
    );
}

export default AllUSerDetails;