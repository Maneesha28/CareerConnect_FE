import React, { useState, useEffect, useContext } from 'react';
import { IconButton, Badge, Popover, List, ListItem, ListItemText, Dialog, DialogContent, DialogTitle, 
    DialogActions, Divider, ListItemButton, Button } from '@mui/material';
import axios from 'axios';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NotificationContext } from "../context/notificationContext";
import { set } from 'date-fns';
import { Link } from 'react-router-dom';

function Notification() {
  const { allNotifications, setAllNotifications, unreadNotifications, setUnreadNotifications, unreadNotificationsCount, setUnreadNotificationsCount, loggedInUser, setLoggedInUser } = useContext(NotificationContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [click, setClick] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingUser,setIsLoadingUser] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setCurrentUser(response.data);
      setLoggedInUser(response.data);
      //console.log("current user fetched, ",response.data.user_id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllNotifications = async () => {
    console.log('Fetching All Notifications');
    try {
      const response = await axios.get('/api/notification/all', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
      setAllNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  const fetchUnreadNotifications = async () => {
      try {
        const response = await axios.get('/api/notification/unread', {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
        setUnreadNotifications(response.data);
        console.log("unread notifications axios", unreadNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchUnreadNotificationsCount = async () => {
        try {
            const response = await axios.get('/api/notification/count', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setUnreadNotificationsCount(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markNotificationsRead = async () => {
      try {
          const response = await axios.put('/api/notification/mark_read', {
              headers: {
                  'Content-Type': 'application/json',
              },
              withCredentials: true,
          });
          if(response.data.status === 'Marked as read'){
              fetchUnreadNotificationsCount();
              fetchUnreadNotifications();
          }
      } catch (error) {
          console.error('Error fetching notifications:', error);
      }
  };


  useEffect(() => {
    fetchUnreadNotifications();
    fetchAllNotifications();
    fetchCurrentUser();
    fetchUnreadNotificationsCount();
  }, []);

  const handleOpenNotifications = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
    markNotificationsRead();
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    fetchAllNotifications();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="Notifications"
        onClick={handleOpenNotifications}
        sx={{ paddingRight: 4, paddingLeft: 4 }}
      >
        <Badge badgeContent={unreadNotificationsCount.count > 0 ? unreadNotificationsCount.count : null} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseNotifications}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
        {unreadNotificationsCount.count > 0 ? (
            unreadNotifications.map((notification) => (
            <a
                key={notification.notification_id}
                href={
                notification.notification_type === 'jobpost'
                    ? `/viewJobPost/${notification.related_id}`
                    : `/jobseeker/${notification.related_id}`
                }
                style={{ textDecoration: 'none' }}
            >
                <ListItem>
                <ListItemText primary={notification.text} />
                </ListItem>
            </a>
            ))
        ) : (
            <ListItem>
            <ListItemText primary="No new notifications" />
            </ListItem>
        )}
        <Divider />
        <ListItemButton onClick={handleOpenDialog}>
            <ListItemText primary="View all notifications" style={{ color: 'blue' }} />
        </ListItemButton>
        </List>

      </Popover>
      <Dialog open={openDialog} onClose={handleCloseDialog} modal={false}
      >
        <DialogTitle>All Notifications</DialogTitle>
        <DialogContent>
          <List>
            {allNotifications.map((notification) => (
              <List>
              {allNotifications.map((notification) => (
                <React.Fragment key={notification.notification_id}>
                  {notification.notification_type === 'jobpost' && (
                    <Link
                      to={{
                        pathname: `/viewJobPost/${notification.related_id}`,
                        state: { jobpost_id: notification.related_id }
                      }}
                      style={{ textDecoration: 'none' }}
                    >
                      <ListItem>
                        <ListItemText primary={notification.text} />
                      </ListItem>
                    </Link>
                  )}
                  {notification.notification_type === 'follow' && (
                    <Link
                      to={`/jobseeker/${notification.related_id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <ListItem>
                        <ListItemText primary={notification.text} />
                      </ListItem>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </List>
            

              // <Link
              //   key={notification.notification_id}
              //   to={
              //     notification.notification_type === 'jobpost'
              //       ? {
              //           pathname: `/viewJobPost/${notification.related_id}`,
              //           state: { jobseeker_id: currentUser.user_id }
              //         }
              //       : `/jobseeker/${notification.related_id}`
              //   }
              //   style={{ textDecoration: 'none' }}
              // >
              //   <ListItem>
              //     <ListItemText primary={notification.text} />
              //   </ListItem>
              // </Link>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Notification;
