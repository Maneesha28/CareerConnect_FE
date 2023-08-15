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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const skillInfoData = [
  { id: 1, skillName: 'JavaScript', expertiseLevel: 'Intermediate' },
  { id: 2, skillName: 'React', expertiseLevel: 'Advanced' },
  // Add more skill info as needed
];

function SkillInfo() {
  const [skillInfo, setSkillInfo] = useState(skillInfoData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedSkillInfo, setEditedSkillInfo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newSkillInfo, setNewSkillInfo] = useState({
    skillName: '',
    expertiseLevel: 'Beginner',
  });

  const handleDeleteSkillInfo = (infoId) => {
    setSkillInfo(skillInfo.filter((info) => info.id !== infoId));
  };

  const handleAddSkillInfo = () => {
    setIsDialogOpen(true);
  };

  const handleEditSkillInfo = (info) => {
    setEditedSkillInfo(info);
    setNewSkillInfo({
      skillName: info.skillName,
      expertiseLevel: info.expertiseLevel,
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewSkillInfo({
      skillName: '',
      expertiseLevel: 'Beginner',
    });
  };

  const handleSaveSkillInfo = () => {
    setSkillInfo([...skillInfo, { ...newSkillInfo, id: skillInfo.length + 1 }]);
    handleCloseDialog();
  };

  const handleSaveEdit = () => {
    if (editedSkillInfo) {
      const updatedSkillInfo = skillInfo.map((info) =>
        info.id === editedSkillInfo.id ? { ...info, ...newSkillInfo } : info
      );
      setSkillInfo(updatedSkillInfo);
    }
    setEditedSkillInfo(null);
    setIsEditDialogOpen(false);
    setNewSkillInfo({
      skillName: '',
      expertiseLevel: 'Beginner',
    });
  };

  const handleCancelEdit = () => {
    setEditedSkillInfo(null);
    setIsEditDialogOpen(false);
    setNewSkillInfo({
      skillName: '',
      expertiseLevel: 'Beginner',
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
                Skill Information
              </Typography>
              <ButtonBase
                component="div"
                onClick={handleAddSkillInfo}
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
              {skillInfo.length === 0 ? (
                <Typography>No skill information available.</Typography>
              ) : (
                <List>
                  {skillInfo.map((info) => (
                    <ListItem key={info.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <ListItemText
                          primary={info.skillName}
                          secondary={
                            <div>Expertise Level: {info.expertiseLevel}</div>
                          }
                        />
                      </Box>
                      <Box>
                        <IconButton color="error" onClick={() => handleDeleteSkillInfo(info.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEditSkillInfo(info)}>
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
        <DialogTitle>Add New Skill Information</DialogTitle>
        <DialogContent>
          {/* Add text fields for skill details */}
          <TextField
            label="Skill Name"
            fullWidth
            margin="dense"
            value={newSkillInfo.skillName}
            onChange={(e) => setNewSkillInfo({ ...newSkillInfo, skillName: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Expertise Level</InputLabel>
            <Select
              value={newSkillInfo.expertiseLevel}
              onChange={(e) => setNewSkillInfo({ ...newSkillInfo, expertiseLevel: e.target.value })}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveSkillInfo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Skill Information</DialogTitle>
        <DialogContent>
          {/* Display existing skill info */}
          {editedSkillInfo && (
            <Box>
              <TextField
                label="Skill Name"
                fullWidth
                margin="dense"
                value={newSkillInfo.skillName}
                onChange={(e) => setNewSkillInfo({ ...newSkillInfo, skillName: e.target.value })}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Expertise Level</InputLabel>
                <Select
                  value={newSkillInfo.expertiseLevel}
                  onChange={(e) => setNewSkillInfo({ ...newSkillInfo, expertiseLevel: e.target.value })}
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
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

export default SkillInfo;
