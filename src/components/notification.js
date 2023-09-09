import React, { useState, useEffect, useContext } from 'react';
import { IconButton, Badge, Popover, List, ListItem, ListItemText, Dialog, DialogContent, DialogTitle, 
    DialogActions, Divider, ListItemButton, Button } from '@mui/material';
import axios from 'axios';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NotificationContext } from "../context/notificationContext";

function Notification() {
  const { allNotifications, setAllNotifications, unreadNotifications, setUnreadNotifications, unreadNotificationsCount, setUnreadNotificationsCount } = useContext(NotificationContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchAllNotifications = async () => {
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
    fetchAllNotifications();
    fetchUnreadNotifications();
    fetchUnreadNotificationsCount();
  }, []);

  const handleOpenNotifications = (event) => {
    setAnchorEl(event.currentTarget);
    markNotificationsRead();
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
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
                    ? `/companyViewJobPost/${notification.related_id}`
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>All Notifications</DialogTitle>
        <DialogContent>
          <List>
            {allNotifications.map((notification) => (
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
