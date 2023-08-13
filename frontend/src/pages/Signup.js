import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Button, TextField, Link, Paper, Box, CssBaseline, Grid, Typography, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if valid email and password (length > 8)
    if(!formData.email || !formData.password || !formData.role) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (formData.email.includes('@') === false) {
      setErrorMessage('Email address must contain @. Please try again.');
      return;
    }
    if (formData.password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long. Please try again.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials (cookies) with the request
        });
      console.log(response.data);
      if (response.data.status === "Email already exists") {
        setErrorMessage('Email already exists. Please try again.');
      }
      if (response.data.status === "Successfully registered") {
        window.location.href = '/auth/login?status=registered';
      }
      // Redirect or update state to reflect successful signup
    } catch (error) {
      // Handle signup error, show error message, etc.
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
              Create An Account
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {errorMessage &&
              <Alert severity="error">
                <strong>{errorMessage}</strong>
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
              <FormControl sx={{
                mt: 1, ml: 2
              }}>
                <FormLabel id="demo-controlled-radio-buttons-group" required>Role</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="role"
                  row
                  value={formData.role}
                  onChange={handleChange}
                >
                  <FormControlLabel value="jobseeker" control={<Radio />} label="Job Seeker" 
                  sx={{
                    mr: 5
                  }}/>
                  <FormControlLabel value="company" control={<Radio />} label="Company" />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, mx: 'auto', display: 'block'}}
              >
                Sign Up
              </Button>
              <Grid container sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Grid item>
                  <Link href="/auth/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    // <div className="signUpContainer">
    //     {errorMessage && <div>{errorMessage}</div>}
    //   <form onSubmit={handleSubmit} className="signUpForm">
    //     <div>
    //       <label>Email:</label>
    //       <input
    //         type="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         placeholder="Enter your email"
    //       />
    //     </div>
    //     <div>
    //       <label>Password:</label>
    //       <input
    //         type="password"
    //         name="password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         placeholder="Enter your password"
    //       />
    //     </div>
    //     <div>
    //       <label>Role:</label>
    //       <select name="role" value={formData.role} onChange={handleChange}>
    //         <option value="jobseeker">Job Seeker</option>
    //         <option value="company">Company</option>
    //       </select>
    //     </div>
    //     <button type="submit" className="signUpButton">
    //       Sign Up
    //     </button>
    //   </form>
    // </div>
  );
}

export default SignUp;
