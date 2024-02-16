import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DataCard } from './Components/DataCard/DataCard';
import { Box, Button, IconButton, Switch } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';


function AllUSerDetails() {
    const location = useLocation();
    const { state } = location;
    const params = useParams();
    const navigate = useNavigate();

    const [loader, setloader] = useState(false)

    const [userDetails, setUserDetails] = useState([]);

    const getUserData = async () => {
        setloader(true)
        try {
            const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/allxyz`)
            console.log(data);
            setUserDetails(data?.data)
            setloader(false)
        } catch (error) {
            setloader(false)
        }
    }

    const [blockStatuses, setBlockStatuses] = useState(() => {
        const storedBlockStatuses = JSON.parse(
            localStorage.getItem('blockStatuses')
        );
        return storedBlockStatuses || {};
    });

    const handleBlockToggle = async (userId, blockStatus) => {
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
        { field: 'isBlocked', headerName: 'Blocked', flex: 0.2 },

    ];

    useEffect(() => {
        getUserData()

    }, []);

    return (
        <div style={{ textAlign: 'center', marginBottom: "100px" }}>
            <span style={{ fontSize: "15px" }}>All User Data
            </span>
            {loader ? "loading" : <Box sx={{ width: '100%', overflow: "scroll" }}>
                <DataGrid
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
                    onRowClick={(row) => {
                        console.log(row);
                    }}

                    slots={{ toolbar: GridToolbar }}
                />
            </Box>}
        </div>
    );
}

export default AllUSerDetails;
