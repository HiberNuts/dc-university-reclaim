import { useLocation, useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { DataCard } from './Components/DataCard/DataCard';
import { Button, IconButton, Switch } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function CourseDetailsPage() {
  const location = useLocation();
  const { state } = location;
  const params = useParams();
  const { course, userData } = state;

  const [userDetails, setUserDetails] = useState(userData);
  const [softDeleteStatus, setSoftDeleteStatus] = useState(course.softDelete);

  const [blockStatuses, setBlockStatuses] = useState(() => {
    const storedBlockStatuses = JSON.parse(
      localStorage.getItem('blockStatuses')
    );
    return storedBlockStatuses || {};
  });

  const handleBlockToggle = async (userId, blockStatus) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/toggleBlock?userId=${userId}`
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

  // ...

  const softDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/course/softDelete?courseId=${params.courseId}`
      );
      const result = await response.json();

      if (response.ok) {
        setSoftDeleteStatus(result.newSoftDeleteStatus);
        toast.success('Course Visibilty Toggled!');
      } else {
        throw new Error(result.message || 'Failed to toggle visiblilty');
      }

      console.log(result);
    } catch (error) {
      console.error('Error syncing course data:', error);
      toast.error(`Error Toggling Visibility`);
    }
  };

  // ...

  const columns = [
    { field: 'username', headerName: 'Username', flex: 0.2 },
    { field: 'email', headerName: 'Email', flex: 0.2 },
    { field: 'walletAddress', headerName: 'Wallet Address', flex: 0.2 },
    { field: 'designation', headerName: 'Designation', flex: 0.2 },
    { field: 'portfolio', headerName: 'Portfolio', flex: 0.2 },
    {
      field: 'blockStatus',
      headerName: 'Block/Unblock',
      flex: 0.2,
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
  ];

  useEffect(() => {
    setUserDetails(userData); 
  }, [userData]);

  return (
    <div style={{ textAlign: 'center' }}>
      <Toaster position="top-right" reverseOrder={false} />
      <div style={{ marginTop: '30px', marginBottom: '20px', }}>
        <h2>COURSE DETAILS</h2>
      </div>

      <div
        key={course._id}
        style={{
          margin: '10px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src={course.banner}
          alt={course.title}
          style={{
            width: '40%',
            height: '40%',
            borderRadius: '12px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            objectFit: 'cover',
            marginBottom: '30px',
          }}
        />

        <div
          style={{
            color: '#3A4CFF',
            fontSize: '20px',
            margin: '0px 0px 20px',
          }}
        >
          <p>
            Course Soft Delete Status:{' '}
            <span style={{ color: '#FF8743' }}>
              {softDeleteStatus.toString().toUpperCase()}
            </span>{' '}
          </p>
        </div>
        {console.log(course)}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <Button variant="contained" color="error">
            Hard Delete
          </Button>
          <Button variant="outlined" color="error" onClick={softDelete}>
            Soft Delete
          </Button>
        </div>

        <div
          style={{
            margin: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <DataCard title="Title" data={course.title} />
          <DataCard
            title="Description"
            data={course.description.slice(0, 200) + (course.description.length > 200 ? "..." : "")}
            sx={{
              maxHeight: '20px',
              overflowY: 'auto',
              margin: '0',
              padding: '0',
            }}
          />
          <DataCard title="Users Enrolled" data={course.usersEnrolled.length} />
          <DataCard title="Level" data={course.level} />
          <DataCard title="Duration" data={course.duration} />
        </div>
        <div
          style={{
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
          }}
        ></div>
      </div>

      <div style={{ marginTop: '30px', marginBottom: '20px' }}>
        <h2>User Details</h2>
      </div>

      <div style={{ height: '400px', width: '100%' }} className="tablediv">
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
          rows={userData}
          columns={columns}
          pageSize={5}
          rowHeight={80}
          rowsPerPageOptions={[5]}
          hideFooter={true}
          getRowId={(row) => row.id}
          onRowClick={(row) => {
            console.log(row);
          }}
        />
      </div>
    </div>
  );
}

export default CourseDetailsPage;
