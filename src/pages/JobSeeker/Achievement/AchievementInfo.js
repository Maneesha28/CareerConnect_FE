import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AchievementInfoTable from './AchievementInfoTable';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function AchievementInfo() {
  const id = useParams().jobseeker_id;
  const [achievements, setAchievements] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedAchievement, setEditedAchievement] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingAchievement, setIsLoadingAchievement] = useState(true);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    name: '',
    date: '',
    position: '',
    organizedBy: '',
  });

  const fetchAchievementData = async () => {
    const endpoint = `http://localhost:3000/api/achievement/all/${id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      // Modify data (e.g., remove columns containing "_id")
      if(response.data.status === 'Access Denied') {
        setError(response.data.status);
        setIsLoadingAchievement(false);
        return;
      }
      setAchievements(response.data);
      setIsLoadingAchievement(false);
    } catch (error) {
      setError(`Error fetching information.`);
      setIsLoadingAchievement(false);
    }
  };

  useEffect(() => {
  fetchAchievementData();
  }, [id]);

  if (isLoadingAchievement) {
    return <div>Loading...</div>;
  }

  const handleDeleteAchievement = async (achievementId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/achievement/${achievementId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response status: ', response.data.status);
      fetchAchievementData();
    } catch (error) {
      console.error('Error deleting achievementInfo:', error);
    }
    setIsDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false); // Close the confirmation dialog
  };

  const handleAddAchievement = () => {
    setIsDialogOpen(true);
  };

  const handleEditAchievement = (achievement) => {
    setEditedAchievement(achievement);
    setNewAchievement({
      name: achievement.achievement_name,
      date: achievement.achievement_date,
      position: achievement.position,
      organizedBy: achievement.organized_by,
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewAchievement({
      name: '',
      date: '',
      position: '',
      organizedBy: '',
    });
  };

  const transformedData = {
      achievement_name: newAchievement.name,
      achievement_date: newAchievement.date,
      position: newAchievement.position,
      organized_by: newAchievement.organizedBy,
  };

  const handleSaveAchievement = async () => {
    try {
      console.log('newAchievement: ', newAchievement);
      const response = await axios.post("http://localhost:3000/api/achievement", transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response:', response);
      fetchAchievementData();
      // const updatedAchievements = [...achievements, { ...transformedData, id: achievements.length + 1 }];
      // setAchievements(updatedAchievements);
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving achievements:', error);
    }
  };
  const handleSaveEdit = async () => {
    if (editedAchievement) {
      console.log('editedAchievement: ', editedAchievement);
      try {
        const response = await axios.put(`http://localhost:3000/api/achievement/${editedAchievement.achievement_id}`, transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        console.log('response: ', response);
        fetchAchievementData();
        setEditedAchievement(null);
        setIsEditDialogOpen(false);
        setNewAchievement({
            name: '',
            date: '',
            position: '',
            organizedBy: '',
          });
      } catch (error) {
        console.error('Error updating achievement:', error);
      }
    }
  };


  const handleCancelEdit = () => {
    setEditedAchievement(null);
    setIsEditDialogOpen(false);
    setNewAchievement({
        name: '',
        date: '',
        position: '',
        organizedBy: '',
      });
  };

  return (
    <>
      <Box p={0}>
        <ButtonBase
              component="div"
              onClick={handleAddAchievement}
              style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              cursor: 'pointer',
              marginRight: '20px'
              }}
              >
              <Typography variant="body1" sx={{ marginRight: '8px' }}>
                  Add
              </Typography>
              <IconButton color="primary">
                  <AddIcon />
              </IconButton>
          </ButtonBase>
        {achievements.length === 0 ? (
          <Typography>No achievements available.</Typography>
        ) : (
          <AchievementInfoTable achievementInfo={achievements} handleDeleteAchievementInfo={handleDeleteAchievement} handleEditAchievementInfo={handleEditAchievement} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} handleCancelDelete={handleCancelDelete} isDeleteConfirmationOpen={isDeleteConfirmationOpen} />
        )}
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Achievement</DialogTitle>
        <DialogContent>
          {/* Add text fields for achievement details */}
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={newAchievement.name}
            onChange={(e) => setNewAchievement({ ...newAchievement, name: e.target.value })}
          />
          <TextField
            label="Date"
            fullWidth
            margin="dense"
            type="date"
            value={newAchievement.date}
            onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
          />
          <TextField
            label="Position"
            fullWidth
            margin="dense"
            value={newAchievement.position}
            onChange={(e) => setNewAchievement({ ...newAchievement, position: e.target.value })}
          />
          <TextField
            label="Organized By"
            fullWidth
            margin="dense"
            value={newAchievement.organizedBy}
            onChange={(e) => setNewAchievement({ ...newAchievement, organizedBy: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveAchievement} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Achievement</DialogTitle>
        <DialogContent>
          {/* Display existing achievement info */}
          {editedAchievement && (
            <Box>
              <TextField
                label="Name"
                fullWidth
                margin="dense"
                value={newAchievement.name}
                onChange={(e) => setNewAchievement({ ...newAchievement, name: e.target.value })}
              />
              <TextField
                label="Date"
                fullWidth
                margin="dense"
                type="date"
                value={newAchievement.date}
                onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
              />
              <TextField
                label="Position"
                fullWidth
                margin="dense"
                value={newAchievement.position}
                onChange={(e) => setNewAchievement({ ...newAchievement, position: e.target.value })}
              />
              <TextField
                label="Organized By"
                fullWidth
                margin="dense"
                value={newAchievement.organizedBy}
                onChange={(e) => setNewAchievement({ ...newAchievement, organizedBy: e.target.value })}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AchievementInfo;
