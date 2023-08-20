import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WorkInfoTable from './WorkInfoTable';
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


function WorkInfo() {
  const id = useParams().jobseeker_id;
  const [workInfo, setWorkInfo] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedWorkInfo, setEditedWorkInfo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingWorkExperience, setIsLoadingWorkExperience] = useState(true);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [newWorkInfo, setNewWorkInfo] = useState({
    organization: '',
    designation: '',
    employmentType: '',
    startDate: '',
    endDate: '',
  });

  const fetchWorkExperienceData = async () => {
    const endpoint = `http://localhost:3001/api/workexperience/all/${id}`;
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
        setIsLoadingWorkExperience(false);
        return;
      }
      setWorkInfo(response.data);
      setIsLoadingWorkExperience(false);
    } catch (error) {
      setError(`Error fetching information.`);
      setIsLoadingWorkExperience(false);
    }
  };

  useEffect(() => {
  fetchWorkExperienceData();
  }, [id]);

  if (isLoadingWorkExperience) {
    return <div>Loading...</div>;
  }

  const handleDeleteWorkInfo = async (infoId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/workexperience/${infoId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response status: ', response.data.status);
      fetchWorkExperienceData();
    } catch (error) {
      console.error('Error deleting workInfo:', error);
    }
    setIsDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false); // Close the confirmation dialog
  };
  

  const handleAddWorkInfo = () => {
    setIsDialogOpen(true);
  };

  const handleEditWorkInfo = (info) => {
    setEditedWorkInfo(info);
    setNewWorkInfo({
      organization: info.organization,
      designation: info.designation,
      employmentType: info.employment_type,
      startDate: info.start_date,
      endDate: info.end_date,
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewWorkInfo({
      organization: '',
      designation: '',
      employmentType: '',
      startDate: '',
      endDate: '',
    });
  };

  const transformedData = {
    designation: newWorkInfo.designation,
    organization: newWorkInfo.organization,
    employment_type: newWorkInfo.employmentType,
    start_date: newWorkInfo.startDate,
    end_date: newWorkInfo.endDate,
  };

  const handleSaveWorkInfo = async () => {
    try {
      console.log('newWorkInfo: ', newWorkInfo);
      const response = await axios.post("http://localhost:3001/api/workexperience", transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response:', response);
      fetchWorkExperienceData();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving workInfo:', error);
    }
  };

  const handleSaveEdit = async () => {
    if (editedWorkInfo) {
      console.log('editedWorkInfo: ', editedWorkInfo);
      try {
        const response = await axios.put(`http://localhost:3001/api/workexperience/${editedWorkInfo.exp_id}`, transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        console.log('response: ', response);
        fetchWorkExperienceData();
        setEditedWorkInfo(null);
        setIsEditDialogOpen(false);
        setNewWorkInfo({
          organization: '',
          designation: '',
          employmentType: '',
          startDate: '',
          endDate: '',
        });
      } catch (error) {
        console.error('Error updating workInfo:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditedWorkInfo(null);
    setIsEditDialogOpen(false);
    setNewWorkInfo({
      organization: '',
      designation: '',
      employmentType: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <>
      <Box p={0}>
        <ButtonBase
          component="div"
          onClick={handleAddWorkInfo}
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
        {workInfo.length === 0 ? (
          <Typography>No work information available.</Typography>
        ) : (
          <WorkInfoTable workInfo={workInfo} handleDeleteWorkInfo={handleDeleteWorkInfo} handleEditWorkInfo={handleEditWorkInfo} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} handleCancelDelete={handleCancelDelete} isDeleteConfirmationOpen={isDeleteConfirmationOpen} />
        )}
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Work Information</DialogTitle>
        <DialogContent>
          {/* Add text fields for work details */}
          <TextField
            label="Organization"
            fullWidth
            margin="dense"
            value={newWorkInfo.organization}
            onChange={(e) => setNewWorkInfo({ ...newWorkInfo, organization: e.target.value })}
          />
          <TextField
            label="Designation"
            fullWidth
            margin="dense"
            value={newWorkInfo.designation}
            onChange={(e) => setNewWorkInfo({ ...newWorkInfo, designation: e.target.value })}
          />
          <TextField
            label="Employment Type"
            fullWidth
            margin="dense"
            value={newWorkInfo.employmentType}
            onChange={(e) => setNewWorkInfo({ ...newWorkInfo, employmentType: e.target.value })}
          />
          <TextField
            label="Start Date"
            fullWidth
            margin="dense"
            type="date"
            value={newWorkInfo.startDate}
            onChange={(e) => setNewWorkInfo({ ...newWorkInfo, startDate: e.target.value })}
          />
          <TextField
            label="End Date"
            fullWidth
            margin="dense"
            type="date"
            value={newWorkInfo.endDate}
            onChange={(e) => setNewWorkInfo({ ...newWorkInfo, endDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveWorkInfo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Work Information</DialogTitle>
        <DialogContent>
          {/* Display existing work info */}
          {editedWorkInfo && (
            <Box>
              <TextField
                label="Organization"
                fullWidth
                margin="dense"
                value={newWorkInfo.organization}
                onChange={(e) => setNewWorkInfo({ ...newWorkInfo, organization: e.target.value })}
              />
              <TextField
                label="Designation"
                fullWidth
                margin="dense"
                value={newWorkInfo.designation}
                onChange={(e) => setNewWorkInfo({ ...newWorkInfo, designation: e.target.value })}
              />
              <TextField
                label="Employment Type"
                fullWidth
                margin="dense"
                value={newWorkInfo.employmentType}
                onChange={(e) => setNewWorkInfo({ ...newWorkInfo, employmentType: e.target.value })}
              />
              <TextField
                label="Start Date"
                fullWidth
                margin="dense"
                type="date"
                value={newWorkInfo.startDate}
                onChange={(e) => setNewWorkInfo({ ...newWorkInfo, startDate: e.target.value })}
              />
              <TextField
                label="End Date"
                fullWidth
                margin="dense"
                type="date"
                value={newWorkInfo.endDate}
                onChange={(e) => setNewWorkInfo({ ...newWorkInfo, endDate: e.target.value })}
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

export default WorkInfo;
