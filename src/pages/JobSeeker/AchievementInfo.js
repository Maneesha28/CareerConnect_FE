import React, { useState } from 'react';
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
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const achievementsData = [
  { id: 1, name: 'Coding Competition Winner', date: '2021-06-15', position: '1st Place', organizedBy: 'CodeFest' },
  { id: 2, name: 'Outstanding Performance Award', date: '2020-12-01', position: 'Top Performer', organizedBy: 'TechAchieve' },
  // Add more achievements as needed
];

function AchievementInfo() {
  const [achievements, setAchievements] = useState(achievementsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedAchievement, setEditedAchievement] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    name: '',
    date: '',
    position: '',
    organizedBy: '',
  });

  const handleDeleteAchievement = (achievementId) => {
    setAchievements(achievements.filter((achievement) => achievement.id !== achievementId));
  };

  const handleAddAchievement = () => {
    setIsDialogOpen(true);
  };

  const handleEditAchievement = (achievement) => {
    setEditedAchievement(achievement);
    setNewAchievement({
      name: achievement.name,
      date: achievement.date,
      position: achievement.position,
      organizedBy: achievement.organizedBy,
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

  const handleSaveAchievement = () => {
    setAchievements([...achievements, { ...newAchievement, id: achievements.length + 1 }]);
    handleCloseDialog();
  };
  const handleSaveEdit = () => {
    if (editedAchievement) {
      const updatedAchievements = achievements.map((achievement) =>
        achievement.id === editedAchievement.id ? { ...achievement, ...newAchievement } : achievement
      );
      setAchievements(updatedAchievements);
    }
    setEditedAchievement(null);
    setIsEditDialogOpen(false);
    setNewAchievement({
        name: '',
        date: '',
        position: '',
        organizedBy: '',
      });
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
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box p={3}>
          <Paper elevation={3}>
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Achievements
              </Typography>
              <ButtonBase
                    component="div"
                    onClick={handleAddAchievement}
                    style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    cursor: 'pointer',
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
                <List>
                  {achievements.map((achievement) => (
                    <ListItem key={achievement.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <ListItemText
                          primary={achievement.name}
                          secondary={`${achievement.date} | ${achievement.position} | Organized by: ${achievement.organizedBy}`}
                        />
                      </Box>
                      <Box>
                        <IconButton color="error" onClick={() => handleDeleteAchievement(achievement.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEditAchievement(achievement)}>
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Paper>
        </Box>
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
