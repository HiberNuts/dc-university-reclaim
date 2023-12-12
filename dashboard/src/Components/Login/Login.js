import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import logo from '../../assets/university.svg';

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ adminEmail: email, password: password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        await toast.promise(
          new Promise((resolve) => setTimeout(resolve, 1000)), // Wait for 2 seconds
          {
            loading: 'Please Wait...',
            success: 'Logged in successfully!',
            error: 'Login failed!',
          }
        );
        navigate('/');
      } else {
        toast.error('Failed to log in. Please check your credentials.');
      }
    } catch (error) {
      toast.error('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'var(--shardeum-white)',
      }}
    >
      <Box
        sx={{
          width: 300,
          padding: 3,
        }}
      >
        <Toaster />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '500px',
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: '100%', height: 'auto' }}
            />
            <Typography
              sx={{
                color: 'grey',
              }}
            >
              Admin
            </Typography>
          </Box>

          <form
            className="form-container"
            onSubmit={handleLogin}
            style={{ width: '100%' }}
          >
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="login-button-container">
              <Button
                className="login-button"
                variant="contained"
                disableElevation
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : <p className='icon'>Login</p> }
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
