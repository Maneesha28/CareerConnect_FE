import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'jobseeker', // Default role is set to 'jobseeker'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="signUpContainer">
        {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="signUpForm">
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
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="jobseeker">Job Seeker</option>
            <option value="company">Company</option>
          </select>
        </div>
        <button type="submit" className="signUpButton">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
