import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const FollowersList = () => {
  const [followers, setFollowers] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [is, setIs] = useState(false);

  // Simulated data for followers
  const sampleFollowers = ["Follower 1", "Follower 2", "Follower 3"];

  const handleShowFollowers = (event) => {
    setFollowers(sampleFollowers);
    setIs(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setIs(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleShowFollowers}>
        Show Followers
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem>
          <Typography variant="h6">Followers:</Typography>
        </MenuItem>
        {followers.map((follower, index) => (
          <MenuItem key={index} onClick={handleCloseMenu}>
            {follower}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default FollowersList;
