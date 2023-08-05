import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="website-name">Your Website Name</h1>
      </div>
      <div className="header-right">
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
        <Link to="/signin" className="signin-link">
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
