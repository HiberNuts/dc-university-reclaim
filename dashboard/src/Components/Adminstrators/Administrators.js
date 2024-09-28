import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { RiUser2Fill } from 'react-icons/ri';
import { IoMdAddCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import './Administrators.css';


const Administrators = () => {
  const [admins, setAdmins] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const registerAdmin = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert("Unauthorized to add admins");
        return;
      }
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            adminEmail: email,
            password: password,
          }),
        }
      );

      if (response.status === 400) {
        toast.error('Both of the fields are required');
      }

      if (response.status === 409) {
        toast.error('Email Already Exists');
      }

      if (response.ok) {
        const toastId = toast.loading('Registering...');

        setTimeout(async () => {
          toast.success('Registration successful!', { id: toastId });

          setEmail('');
          setPassword('');
          setOpenModal(false);

          fetchAdmins();
        }, 2000);
      } else {
        const errorResult = await response.text();
        console.error('Registration failed:', errorResult);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/getAdmin`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAdmins(data.adminEmails);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const deleteAdmin = async (adminEmail) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert("Unauthorized to add admins");
        return;
      }
      console.log(JSON.stringify({ adminEmail: adminEmail }))
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/deleteAdmin`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ adminEmail: adminEmail }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Admin deleted successfully');


      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast.error('Failed to delete admin');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="overall">
      <Toaster />
      <h2 style={{ textAlign: 'center', color: 'var(--shardeum-blue)', marginBottom: '15px' }}>
        ADMINISTRATOR'S LIST
      </h2>
      <List>
        {admins.map((adminEmail, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" style={{ color: 'tomato' }} onClick={() => deleteAdmin(adminEmail)}>
                <MdDelete />
              </IconButton>
            }
          >
            <ListItemIcon>
              <RiUser2Fill style={{ fontSize: '2rem' }} />
            </ListItemIcon>
            <ListItemText primary={adminEmail} secondary={'Administrator'} />
          </ListItem>
        ))}
      </List>

      <Fab
        color="primary"
        aria-label="add"
        className="fab-bottom-right"
        onClick={handleOpen}
      >
        <IoMdAddCircle className="fab-icon" style={{ fontSize: '2rem' }} />
      </Fab>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{
            position: 'absolute',
            borderRadius: '12px',

            transform: 'translate(-50%, -50%) ',
            width: 400,
            bgcolor: 'var(--shardeum-white)',
            boxShadow: '8px 8px 0px 0px rgba(0, 0, 0, 0.15)',
            p: 4,
            animation: 'modalFadeInScaleUp 0.4s ease-in-out forwards',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography
              sx={{ color: 'var(--shardeum-blue)', fontWeight: 'bold' }}
            >
              ADD ADMIN
            </Typography>

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="register-field"
              type="email"
              required
              value={email}
              onChange={handleEmailChange}
            />

            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              className="register-field"
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={registerAdmin}
              variant="contained"
              color="primary"
              className="register-button"
              disableElevation
            >
              <span className="icon">Register</span>
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Administrators;
