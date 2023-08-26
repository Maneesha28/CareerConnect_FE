import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SkillInfoTable from './SkillInfoTable';
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

function SkillInfo({ isLoggedInUser }) {
  const id = useParams().jobseeker_id;
  const [skillInfo, setSkillInfo] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedSkillInfo, setEditedSkillInfo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingSkill, setIsLoadingSkill] = useState(true);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [newSkillInfo, setNewSkillInfo] = useState({
    skillName: '',
    expertiseLevel: 'Beginner',
  });

  const fetchSkillData = async () => {
    const endpoint = `/api/skill/all/${id}`;
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
        setIsLoadingSkill(false);
        return;
      }
      setSkillInfo(response.data);
      setIsLoadingSkill(false);
    } catch (error) {
      setError(`Error fetching information.`);
      setIsLoadingSkill(false);
    }
  };

  useEffect(() => {
  fetchSkillData();
  }, [id]);

  if (isLoadingSkill) {
    return <div>Loading...</div>;
  }

  const handleDeleteSkillInfo = async (infoId) => {
    try {
      const response = await axios.delete(`/api/skill/${infoId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response status: ', response.data.status);
      fetchSkillData();
    } catch (error) {
      console.error('Error deleting skillInfo:', error);
    }
    setIsDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false); // Close the confirmation dialog
  };

  const handleAddSkillInfo = () => {
    setIsDialogOpen(true);
  };

  const handleEditSkillInfo = (info) => {
    setEditedSkillInfo(info);
    setNewSkillInfo({
      skillName: info.skill_name,
      expertiseLevel: info.expertise_level,
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

  const transformedData = {
    skill_name: newSkillInfo.skillName,
    expertise_level: newSkillInfo.expertiseLevel,
  };

  const handleSaveSkillInfo = async () => {
    try {
      console.log('newSkillInfo: ', newSkillInfo);
      const response = await axios.post("/api/skill", transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response:', response);
      fetchSkillData();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving skillInfo:', error);
    }
  };

  const handleSaveEdit = async () => {
    if (editedSkillInfo) {
      console.log('editedSkillInfo: ', editedSkillInfo);
      try {
        const response = await axios.put(`/api/skill/${editedSkillInfo.skill_id}`, transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        console.log('response: ', response);
        fetchSkillData();
        setEditedSkillInfo(null);
        setIsEditDialogOpen(false);
        setNewSkillInfo({
          skillName: '',
          expertiseLevel: 'Beginner',
        });
      } catch (error) {
        console.error('Error updating skillInfo:', error);
      }
    }
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
      <Box p={0}>
        {isLoggedInUser && 
        <ButtonBase
          component="div"
          onClick={handleAddSkillInfo}
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
        </ButtonBase>}
        {skillInfo.length === 0 ? (
          <Typography>No skill information available.</Typography>
        ) : (
          <SkillInfoTable isLoggedInUser={isLoggedInUser} skillInfo={skillInfo} handleDeleteSkillInfo={handleDeleteSkillInfo} handleEditSkillInfo={handleEditSkillInfo} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} handleCancelDelete={handleCancelDelete} isDeleteConfirmationOpen={isDeleteConfirmationOpen} />
        )}
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
