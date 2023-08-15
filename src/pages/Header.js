// Create a new file called Header.js

import React from 'react';
import './Header.css'; // You can create a CSS file for styling the header

const Header = ({ logo, loggedInUserId }) => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Website Logo" />
      </div>
      <div className="user-id">
        {loggedInUserId ? `Logged In User: ${loggedInUserId}` : 'Not Logged In'}
      </div>
    </div>
  );
};

export default Header;
