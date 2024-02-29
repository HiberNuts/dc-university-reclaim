import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar, useGridApiRef } from '@mui/x-data-grid';
import { DataCard } from './Components/DataCard/DataCard';
import { Box, Button, IconButton, Switch } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { saveAs } from 'file-saver';


function CourseDetailsPage() {
  const location = useLocation();
  const { state } = location;
  const params = useParams();
  const { course } = state;
  const navigate = useNavigate();

  const gridRef = useGridApiRef();
  const [userData, setuserData] = useState([])
  const [userDetails, setUserDetails] = useState(userData);
  const [softDeleteStatus, setSoftDeleteStatus] = useState(course.softDelete);
  const [isLoading, setIsLoading] = useState(false);

  const [csvLoading, setcsvLoading] = useState(false)

  // const [usersEnrolled, setUsersEnrolled] = useState(course?.usersEnrolled.slice(0, pageSize)); // Initial set of user IDs to load

  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: course?.usersEnrolled.length / 10 }); // Initial pagination values


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

  const hardDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/course/getCourse?id=${params.courseId}`)
      if (response.status == 200) {
        toast("course Deleted")
        navigate(-1)
      }

    } catch (error) {
      toast.error(`Error while deleting course`);
    }
  }
  //  const getUserCourseProgressPercentage = async ({ courseId, userId, accessToken }) => {
  //   try {
  //     const { data } = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/user/progressPercentage`,
  //       {
  //         courseId,
  //         userId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     return data;
  //   } catch (error) {
  //     // toast.error("Something went wrong!");
  //     return error;
  //   }
  // };

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
    { field: 'isVerified', headerName: 'IsVerified', flex: 0.1 },
    { field: 'walletAddress', headerName: 'Wallet Address', flex: 0.2 },
    { field: 'designation', headerName: 'Designation', flex: 0.15 },
    { field: 'portfolio', headerName: 'Portfolio', flex: 0.2 },
    {
      field: 'NFTstatus', headerName: 'NFT status', flex: 0.1, renderCell: (params) => {
        const i = params?.row?.enrolledCourses?.findIndex(x => x.courseId === course._id)
        return <div>
          {params?.row?.enrolledCourses[i]?.nftStatus.toString() || "Not found"}
        </div>
      }


    },
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


  const handleExportCSV = async () => {
    try {
      setcsvLoading(true)
      // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/allxyz`, {
      //   params: { page: 1, limit: pagination.totalPages * pagination.limit } // Fetch all data without pagination
      // });
      const csvUserData = await Promise.all(
        course?.usersEnrolled.map(async (userId) => {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/user?userId=${userId}`);
          const userResult = await response.json();
          return { id: userId, ...userResult };
        })
      );
      // Convert data to CSV format
      const headerRow = 'Username,Email,IsVerified,Wallet Address,Designation,Portfolio,IsBlocked,Nft Status';
      const csvData = csvUserData.map(user => {
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


  const getUserData = async ({ page }) => {
    setIsLoading(true);

    // Calculate the next set of user IDs to fetch
    const nextPageUserIds = course?.usersEnrolled.slice((page - 1) * pagination.limit, page * pagination.limit);
    const newUsers = await Promise.all(
      nextPageUserIds.map(async (userId) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/user?userId=${userId}`);
        const userResult = await response.json();
        return { id: userId, ...userResult };
      })
    );

    setuserData(newUsers);
    setIsLoading(false);

  }


  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
    getUserData({ newPage })
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

  useEffect(() => {
    getUserData({ page: pagination.page })
  }, [pagination.page]);

  return (
    <div style={{ textAlign: 'center', marginBottom: "100px" }}>
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
        {/* {console.log(course)} */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <Button onClick={hardDelete} variant="contained" color="error">
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
      <div>
        <Button disabled={csvLoading} variant='contained' className='text-lg' onClick={handleExportCSV}>{csvLoading ? "Generating your file please wait" : "Export as CSV"} </Button>
      </div>
      {/* <div style={{ height: '400px', width: '100%', overflow: 'auto' }} className="tablediv"> */}
      <Box sx={{ width: '100%', overflow: "scroll" }}>
        <DataGrid
          // pagination
          sx={{
            backgroundColor: 'white',
            boxShadow: 2,
            border: 0,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
          key={Date}
          rows={userData}
          columns={columns}
          rowHeight={60}
          pageSize={10}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
      <div>
        <Button disabled={pagination.page === 1} onClick={handlePrevPage}>Previous Page</Button>
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <Button disabled={pagination.page === pagination.totalPages} onClick={handleNextPage}>Next Page</Button>
      </div>

      {/* </div> */}
    </div>
  );
}

export default CourseDetailsPage;
