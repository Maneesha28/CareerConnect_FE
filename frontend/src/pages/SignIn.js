import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

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

  return (
    <div className="signInContainer">
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="signInForm">
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="signInButton">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
