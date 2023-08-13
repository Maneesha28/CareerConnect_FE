import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Alert, Button, TextField, Link, Paper, Box, CssBaseline, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function SignIn() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const status = new URLSearchParams(location.search).get('status');
    if (status === 'registered') {
      setSuccessMessage('Successfully registered. Please log in to continue.');
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials (cookies) with the request
      });
      if (response.data.status === 'Wrong email') {
        setErrorMessage('Invalid email address. Please try again.');
      } 
      else if (response.data.status === 'Wrong password') {
        setErrorMessage('Invalid password. Please try again.');
      } 
      else if (response.data.jobseeker_id) {
        console.log(response.data);
        window.location.href = '/jobseeker/'+response.data.jobseeker_id;
      }
      else if (response.data.company_id) {
        window.location.href = '/company/'+response.data.company_id;
      }
      
        
      // Redirect or update state to reflect successful login
    } catch (error) {
      console.log(error);
      // Handle login error, show error message, etc.
    }
  };

  const defaultTheme = createTheme(
    {
      typography: {
        fontSize: 20
      }
    }
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url(/background2.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} sx={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
        }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{
              fontWeight: 'bold',
              fontFamily:  'Baskerville Old Face',
              color: '#12131',
              fontSize: '40px',       
              }}>
              SIGN IN
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {errorMessage &&
              <Alert severity="error">
                <strong>{errorMessage}</strong>
              </Alert>}
              {successMessage &&
              <Alert severity="success">
                <strong>{successMessage}</strong>
              </Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, mx: 'auto', display: 'block'}}
              >
                Sign In
              </Button>
              <Grid container sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/auth/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
