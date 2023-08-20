import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
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

const drawerWidth = 300;

export default function ClippedDrawer() {
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
                fontSize: 16,
            },
        }
    );
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ height: 80, backgroundColor: 'rgb(101, 39, 190)', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box flexGrow={1} display="flex" alignItems="center" sx={{pt: 1}}>
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
            <MenuItem onClick={handleCloseUserMenu} component={Link} to={`/jobseeker/${id}`}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem><LogoutButton/></MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{marginTop: 15, marginLeft: 3}}>
            <ListItem>
                <ListItemButton>
                <Link to={`/companyVacancy/3`}>
                    <Typography variant="h4">Job Posts</Typography>
                </Link>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                <Link to={`/companyReviews/3`}>
                    <Typography variant="h4">Reviews</Typography>
                </Link>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                <Link to={`https://therapbd.com/`}>
                    <Typography variant="h4">Website</Typography>
                </Link>
                </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}