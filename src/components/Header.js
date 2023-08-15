import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import {
  Home,
  ContactMail,
  Email,
  Phone,
  Notifications,
  Settings,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Header = () => {
  const [contactMenuAnchor, setContactMenuAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenContactMenu = (event) => {
    setContactMenuAnchor(event.currentTarget);
  };

  const handleCloseContactMenu = () => {
    setContactMenuAnchor(null);
  };

  const handleOpenNotificationMenu = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setNotificationAnchor(null);
  };

  const handleOpenSettingsMenu = (event) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setSettingsAnchor(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
      <Box flexGrow={1} display="flex" alignItems="center">
            <IconButton color="inherit" component={Link} to="/">
                <Home fontSize="large" />
            </IconButton>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6">Career Connect</Typography>
            </Link>
        </Box>
        <Box>
          <IconButton color="inherit" onClick={handleOpenContactMenu}>
            <ContactMail fontSize="large" />
          </IconButton>
          <IconButton color="inherit" onClick={handleOpenNotificationMenu}>
            <Badge badgeContent={3} color="error">
              <Notifications fontSize="large" />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleOpenSettingsMenu}>
            <Settings fontSize="large" />
          </IconButton>
        </Box>
        <Menu
          anchorEl={contactMenuAnchor}
          open={Boolean(contactMenuAnchor)}
          onClose={handleCloseContactMenu}
        >
          <MenuItem>
            <Email /> abcd@gmail.com
          </MenuItem>
          <MenuItem>
            <Phone /> 082378874
          </MenuItem>
        </Menu>
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleCloseNotificationMenu}
        >
          <MenuItem>Notification 1</MenuItem>
          <MenuItem>Notification 2</MenuItem>
          <MenuItem>Notification 3</MenuItem>
        </Menu>
        <Menu
          anchorEl={settingsAnchor}
          open={Boolean(settingsAnchor)}
          onClose={handleCloseSettingsMenu}
        >
          <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
