import React, { useState } from 'react';
import './TopBar.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { CircularProgress } from '@mui/material'; // Import CircularProgress for the loader
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const TopBar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true); 
    toast.loading('Logging out...', {
      duration: 2000, 
      id: 'logoutToast', 
    });

    setTimeout(() => {
      localStorage.removeItem('authToken');
      toast.dismiss('logoutToast'); 
      navigate('/login');
      setIsLoggingOut(false); 
    }, 2000); 
  };

  return (
    <div className="TopBar">
      <div className="btn-container" onClick={handleLogout}>
  
        <div className="logoutbtn">
          {isLoggingOut ? (
            <CircularProgress style={{ color: 'inherit' }} size={24} />
          ) : (
            <FaSignOutAlt className="icon" style={{ fontSize: 'large' }} />
          )}
        </div>
      </div>
    </div>
  );
};
