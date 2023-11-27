import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { SideNav } from './Components/SideNav/SideNav';
import { TopBar } from './Components/TopBar/TopBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseDetailsPage from './CourseDetailsPage';
import Login from './Components/Login/Login';
import Layout from './Components/Layout/Layout';
import ProtectedRoute from './routes/ProtectedRoute';
import Administrators from './Components/Adminstrators/Administrators';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout>
          <App />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/course-details/:courseId',
    element: (
      <ProtectedRoute>
        <Layout>
          <CourseDetailsPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/administrators',
    element: (
      <ProtectedRoute>
        <Layout>
          <Administrators />
        </Layout>
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
