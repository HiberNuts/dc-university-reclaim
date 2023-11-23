import React, { useEffect, useState } from 'react';
import { DataCard } from './Components/DataCard/DataCard';
import { DataGrid } from '@mui/x-data-grid';
import BeatLoader from 'react-spinners/BeatLoader';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { Grid } from '@mui/material';

function App() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();
  const [pagedata, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'username', headerName: 'Username', flex: 0.2 },
    { field: 'email', headerName: 'Email', flex: 0.2 },
    { field: 'walletAddress', headerName: 'Wallet Address', flex: 0.2 },
    { field: 'designation', headerName: 'Designation', flex: 0.2 },
    { field: 'portfolio', headerName: 'Portfolio', flex: 0.2 },
  ];

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/course/allCourses`
      );
      const result = await response.json();
      setCourses(result.courses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching course data:', error);
      setLoading(false);
    }
  };

  const syncCourseData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/course/syncData`
      );
      const result = await response.json();

      if (response.ok) {
        toast.success('Course data synced successfully!');
      } else {
        throw new Error(result.message || 'Failed to sync data');
      }

      console.log(result);
    } catch (error) {
      console.error('Error syncing course data:', error);
      toast.error(`Error syncing course data`);
    }
  };

  // ...

  const handleCourseClick = async (course) => {
    setSelectedCourse(course);
    const usersEnrolled = course.usersEnrolled || [];
    const userData = await Promise.all(
      usersEnrolled.map(async (userId) => {
        const userResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/user?userId=${userId}`
        );
        const userResult = await userResponse.json();
        return {
          id: userId,
          ...userResult,
        };
      })
    );

    // Navigate to a new page with course and user details
    navigate(`/course-details/${course._id}`, {
      state: { course, userData },
    });
  };

  // ...

  const pieChartData = courses.map((course, index) => ({
    id: index,
    value: course.usersEnrolled.length,
    label: course.title,
  }));

  const labelRenderer = ({ datum }) => {
    return (
      <text
        x={datum.x + datum.width}
        y={datum.y + datum.height / 2}
        textAnchor="start"
      >
        {datum.label}
      </text>
    );
  };

  return (
    <div className="Dashboard" style={{ textAlign: 'center' }}>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        style={{
          color: '#3A4CFF',
          fontSize: '20px',
          margin: '10px 0px',
          fontWeight: 'bold',
        }}
      >
        <p>
          Total Number of Courses:{' '}
          <span style={{ color: '#FF8743' }}>{courses.length}</span>
        </p>
      </div>
      <button
        className="sync-button"
        onClick={syncCourseData}
        style={{
          padding: '10px',
          margin: '10px',
          backgroundColor: '#FF8743',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '10px',
          color: 'white',
        }}
      >
        Sync Courses
      </button>

      <div
        className="Dashboard-grid"
        style={{
          maxWidth: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
         <div
          style={{
            margin: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {courses.map((course) => (
          
              <DataCard
                title={course.title}
                data={course.description}
                onClick={() => handleCourseClick(course)}
                key={course._id}
              />
      
          ))}
        </div>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <PieChart
            series={[{ data: pieChartData }]}
            width={600}
            height={200}
            labelRenderer={labelRenderer}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
