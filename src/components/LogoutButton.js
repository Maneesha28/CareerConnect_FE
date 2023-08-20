import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

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
    <Button variant='text' onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;
