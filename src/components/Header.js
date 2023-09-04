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
  CssBaseline,
} from '@mui/material';
import {
  Home,
  ContactMail,
  Email,
  Phone,
  Notifications,
  Settings,
  WindowSharp,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import axios from 'axios';
import LogoutButton from './LogoutButton';
import { useParams } from 'react-router-dom';

const Header = () => {
  const id = useParams().jobseeker_id;
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

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme(
      {
          typography: {
              fontSize: 20,
          },
      }
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="static" sx={{height: 80, backgroundColor: 'rgb(101, 39, 190)', zIndex: (theme) => theme.zIndex.drawer + 1}} >
        <Toolbar>
        <Box flexGrow={1} display="flex" alignItems="center" sx={{pt: 1}}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>CareerConnect</Typography>
              </Link>
          </Box>
          <Box>
            <Typography
              color="inherit"
              onClick={handleCloseUserMenu}
              // component={Link}
              to={`#`}
              style={{ cursor: 'pointer', marginRight: '20px', fontWeight: 'bold' }}
            >
              Home
            </Typography>
            {/* <IconButton color="inherit" component={Link} to="/">
                <Home fontSize="medium" />
            </IconButton> */}
          </Box>
          <Box>
            <IconButton color="inherit" onClick={handleOpenNotificationMenu} paddingRight='2'>
              <Badge badgeContent={3} color="error">
                <Notifications fontSize="large" />
              </Badge>
            </IconButton>
          </Box>
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleCloseNotificationMenu}
          >
            <MenuItem>Notification 1</MenuItem>
            <MenuItem>Notification 2</MenuItem>
            <MenuItem>Notification 3</MenuItem>
          </Menu>
          <Box>
          <Typography
            color="inherit"
            onClick={handleCloseUserMenu}
            // component={Link}
            to={`/jobseeker/${id}`}
            style={{ cursor: 'pointer', marginRight: '20px', fontWeight: 'bold' }}
          >
            My Profile
          </Typography>
          </Box>
          <Box>
            <LogoutButton />
        </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
