import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmationDialogue from '../../../components/DeleteConfirmationDialogue';
import DateComponent from '../../../components/DateComponent';
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

function ProjectInfo({isLoggedInUser}) {
  const id = useParams().jobseeker_id;
  const [projectInfo, setProjectInfo] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedProjectInfo, setEditedProjectInfo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingProjectInfo, setIsLoadingProjectInfo] = useState(true);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [newProjectInfo, setNewProjectInfo] = useState({
    title: '',
    description: '',
    projectLink: '',
    technologies: '',
    startDate: '',
    endDate: '',
  });

  const fetchProjectData = async () => {
    const endpoint = `/api/project/all/${id}`;
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
        setIsLoadingProjectInfo(false);
        return;
      }
      setProjectInfo(response.data);
      setIsLoadingProjectInfo(false);
    } catch (error) {
      setError(`Error fetching information.`);
      setIsLoadingProjectInfo(false);
    }
  };

  useEffect(() => {
  fetchProjectData();
  }, [id]);

  if (isLoadingProjectInfo) {
    return <div>Loading...</div>;
  };

  const handleDeleteProjectInfo = async (infoId) => {
    try {
      const response = await axios.delete(`/api/project/${infoId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response status: ', response.data.status);
      fetchProjectData();
    } catch (error) {
      console.error('Error deleting projectInfo:', error);
    }
    setIsDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false); // Close the confirmation dialog
  };
  

  const handleAddProjectInfo = () => {
    setIsDialogOpen(true);
  };

  const handleEditProjectInfo = (info) => {
    setEditedProjectInfo(info);
    setNewProjectInfo({
      title: info.title,
      description: info.description,
      projectLink: info.project_link,
      technologies: info.technologies,
      startDate: info.start_date,
      endDate: info.end_date,
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewProjectInfo({
      title: '',
      description: '',
      projectLink: '',
      technologies: '',
      startDate: '',
      endDate: '',
    });
  };

  // Transform the data order to match the backend order
  const transformedData = {
    title: newProjectInfo.title,
    description: newProjectInfo.description,
    project_link: newProjectInfo.projectLink,
    technologies: newProjectInfo.technologies,
    start_date: newProjectInfo.startDate,
    end_date: newProjectInfo.endDate,
  };

  const handleSaveProjectInfo = async () => {
    try {
      console.log('newProjectInfo: ', newProjectInfo);
      const response = await axios.post("/api/project", transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response:', response);
      fetchProjectData();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving projectInfo:', error);
    }
  };

  const handleSaveEdit = async () => {
    if (editedProjectInfo) {
      console.log('editedProjectInfo: ', editedProjectInfo);
      try {
        const response = await axios.put(`/api/project/${editedProjectInfo.project_id}`, transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        console.log('response: ', response);
        fetchProjectData();
        setEditedProjectInfo(null);
        setIsEditDialogOpen(false);
        setNewProjectInfo({
          title: '',
          description: '',
          projectLink: '',
          technologies: '',
          startDate: '',
          endDate: '',
        });
      } catch (error) {
        console.error('Error updating projectInfo:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditedProjectInfo(null);
    setIsEditDialogOpen(false);
    setNewProjectInfo({
      title: '',
      description: '',
      projectLink: '',
      technologies: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <>
      <Box p={0}>
        {isLoggedInUser && <ButtonBase
          component="div"
          onClick={handleAddProjectInfo}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            cursor: 'pointer',
            marginRight: '20px',
          }}
        >
          <Typography variant="body1" sx={{ marginRight: '8px' }}>
            Add
          </Typography>
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
        </ButtonBase>}
        {projectInfo.length === 0 ? (
          <Typography>No project information available.</Typography>
        ) : (
          <List>
            {projectInfo.map((info) => (
              <ListItem key={info.project_id} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc'}}>
                <Box>
                  <ListItemText
                    primary={info.title}
                    secondary={
                      <>
                        <div>{info.description}</div>
                        <div>Project Link: <a href={`http://${info.project_link}`} target="_blank" rel="noopener noreferrer">{info.projectLink}</a></div>
                        <div>Technologies: {info.technologies}</div>
                        <div>
                          Dates: <DateComponent isoDate={info.start_date} /> - <DateComponent isoDate={info.end_date} />
                        </div>
                      </>
                    }
                  />
                </Box>
                {isLoggedInUser && <Box>
                  <IconButton color="primary" onClick={() => handleEditProjectInfo(info)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setIsDeleteConfirmationOpen(true)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>}
                <DeleteConfirmationDialogue
                  isOpen={isDeleteConfirmationOpen}
                  onClose={handleCancelDelete}
                  onDelete={() => handleDeleteProjectInfo(info.project_id)}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Project Information</DialogTitle>
        <DialogContent>
          {/* Add text fields for project details */}
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newProjectInfo.title}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, title: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            value={newProjectInfo.description}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, description: e.target.value })}
          />
          <TextField
            label="Project Link"
            fullWidth
            margin="dense"
            value={newProjectInfo.projectLink}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, projectLink: e.target.value })}
          />
          <TextField
            label="Technologies"
            fullWidth
            margin="dense"
            value={newProjectInfo.technologies}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, technologies: e.target.value })}
          />
          <TextField
            label="Start Date"
            fullWidth
            margin="dense"
            type="date"
            value={newProjectInfo.startDate}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, startDate: e.target.value })}
          />
          <TextField
            label="End Date"
            fullWidth
            margin="dense"
            type="date"
            value={newProjectInfo.endDate}
            onChange={(e) => setNewProjectInfo({ ...newProjectInfo, endDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveProjectInfo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Project Information</DialogTitle>
        <DialogContent>
          {/* Display existing project info */}
          {editedProjectInfo && (
            <Box>
              <TextField
                label="Title"
                fullWidth
                margin="dense"
                value={newProjectInfo.title}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, title: e.target.value })}
              />
              <TextField
                label="Description"
                fullWidth
                margin="dense"
                multiline
                rows={4}
                value={newProjectInfo.description}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, description: e.target.value })}
              />
              <TextField
                label="Project Link"
                fullWidth
                margin="dense"
                value={newProjectInfo.projectLink}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, projectLink: e.target.value })}
              />
              <TextField
                label="Technologies"
                fullWidth
                margin="dense"
                value={newProjectInfo.technologies}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, technologies: e.target.value })}
              />
              <TextField
                label="Start Date"
                fullWidth
                margin="dense"
                type="date"
                value={newProjectInfo.startDate}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, startDate: e.target.value })}
              />
              <TextField
                label="End Date"
                fullWidth
                margin="dense"
                type="date"
                value={newProjectInfo.endDate}
                onChange={(e) => setNewProjectInfo({ ...newProjectInfo, endDate: e.target.value })}
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

export default ProjectInfo;
