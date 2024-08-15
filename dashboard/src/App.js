import React, { useEffect, useState } from 'react';
import { DataCard } from './Components/DataCard/DataCard';
import { useNavigate } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import './App.css';
import AllUSerDetails from './AllUserDetails';

function App() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate("/")
    }
  }, []);

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/course/allCoursesDash`
      );
      const result = await response.json();
      setCourses(result.courses);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  // const syncCourseData = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BACKEND_URL}/api/course/syncData`
  //     );
  //     const result = await response.json();

  //     if (response.ok) {
  //       toast.success('Course data synced successfully!');
  //     } else {
  //       throw new Error(result.message || 'Failed to sync data');
  //     }

  //   } catch (error) {
  //     console.error('Error syncing course data:', error);
  //     toast.error(`Error syncing course data`);
  //   }
  // };

  // ...

  const handleCourseClick = async (course) => {
    // Navigate to a new page with course and user details
    navigate(`/course-details/${course._id}`, {
      state: { course },
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
      {/* <Button
        className="sync-button"
        onClick={syncCourseData}
        contained
        disableElevation
        style={{
          padding: '10px',
          margin: '10px',
          backgroundColor: 'var(--shardeum-orange)',
          cursor: 'pointer',
          border: '2px solid var(--shardeum-blue)',
          borderRadius: '10px',
          color: 'white',
        }}
      >
        Sync Courses
      </Button> */}

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
              title={
                course.title.slice(0, 20) +
                (course.title.length > 20 ? '...' : '')
              }
              data={
                course.description.slice(0, 200) +
                (course.description.length > 200 ? '...' : '')
              }
              onClick={() => handleCourseClick(course)}
              key={course._id}
            />
          ))}
        </div>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: "column" }}
        >
          <PieChart
            series={[
              {
                data: pieChartData,
                innerRadius: 28,
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 10,
                startAngle: -90,
                endAngle: 180,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray',
                },
              },
            ]}

            height={300}
            labelRenderer={labelRenderer}
          />

          <AllUSerDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
