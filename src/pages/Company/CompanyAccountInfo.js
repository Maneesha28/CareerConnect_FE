import React, { useState } from 'react';
import { Box, Paper, Grid, Typography, IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Header from '../../components/Header';
import Sidebar_Company from '../../components/Sidebar_Company';

function CompanyAccountInfo() {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <Header />
      <Box display="flex">
        <Sidebar_Company />
        <Box p={3} flexGrow={1}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  value={email}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handlePasswordToggle} edge="end">
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default CompanyAccountInfo;
