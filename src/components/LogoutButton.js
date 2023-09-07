import React from 'react';
import axios from 'axios';
import {IconButton } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const LogoutButton = () => {
  const handleLogout = () => {
    axios.post('/api/auth/logout', {}, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) {
        window.location.href = '/auth/login';
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <IconButton color='inherit' style={{ cursor: 'pointer', fontWeight: 'bold'}} 
      onClick={handleLogout}><LogoutOutlinedIcon/></IconButton>
  );
};

export default LogoutButton;
