import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Box,
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
import Notification from './notification';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const [contactMenuAnchor, setContactMenuAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNotificationMenu = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setNotificationAnchor(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //for current logged in user
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setCurrentUser(response.data);
      console.log("current user fetched");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme({
    typography: {
      fontSize: 20,
    },
  });

  const typographyStyle = {
    fontWeight: "bold",
    fontFamily: "Didot, serif",
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          height: 80,
          backgroundColor: "#124559",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Box flexGrow={1} display="flex" alignItems="center" sx={{ pt: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h6" style={typographyStyle}>
                CareerConnect
              </Typography>
            </Link>
          </Box>
          {currentUser && currentUser.role === "company" && (
            <Box>
              <IconButton
                color="inherit"
                paddingRight="2"
                component={Link}
                to={`/company/${currentUser.user_id}`}
              >
                <Home />
              </IconButton>
            </Box>
          )}
          {currentUser && currentUser.role === "jobseeker" && (
            <Box>
              <IconButton color="inherit" paddingRight="2" component={Link}>
                <Home />
              </IconButton>
            </Box>
          )}
          <Box>
            <IconButton
              color="inherit"
              onClick={handleOpenNotificationMenu}
              sx={{ paddingLeft: 4 }}
            >
              Home
            </Typography>
            {/* <IconButton color="inherit" component={Link} to="/">
                <Home fontSize="medium" />
            </IconButton> */}
          </Box>
          <Box>
            <Notification />
            {/* <IconButton color="inherit" onClick={handleOpenNotificationMenu} paddingRight='2'>
              <Badge badgeContent={3} color="error">
                <Notifications fontSize="large" />
              </Badge>
            </IconButton> */}
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
            {currentUser && currentUser.role === "jobseeker" && (
              <IconButton
                color="inherit"
                paddingRight="2"
                onClick={handleCloseUserMenu}
                component={Link}
                to={`/jobseeker/${currentUser.user_id}`}
                sx={{ paddingLeft: 4 }}
              >
                <AccountCircleIcon />
              </IconButton>
            )}
          </Box>
          <Box sx={{ paddingLeft: 3 }}>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
