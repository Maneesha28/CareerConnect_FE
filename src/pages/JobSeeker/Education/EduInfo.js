import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EduInfoTable from './EduInfoTable';
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


function EduInfo() {
  const id = useParams().jobseeker_id;
  const [eduInfo, setEduInfo] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedEduInfo, setEditedEduInfo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingEducation, setIsLoadingEducation] = useState(true);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [newEduInfo, setNewEduInfo] = useState({
    degree: '',
    subject: '',
    institution: '',
    result: '',
    startDate: '',
    endDate: '',
  });

  const fetchEducationData = async () => {
    const endpoint = `http://localhost:3001/api/education/all/${id}`;
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
        setIsLoadingEducation(false);
        return;
      }
      setEduInfo(response.data);
      setIsLoadingEducation(false);
    } catch (error) {
      setError(`Error fetching information.`);
      setIsLoadingEducation(false);
    }
  };

  useEffect(() => {
  fetchEducationData();
  }, [id]);

  if (isLoadingEducation) {
    return <div>Loading...</div>;
  };

  const handleDeleteEduInfo = async (infoId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/education/${infoId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response status: ', response.data.status);
      fetchEducationData();
    } catch (error) {
      console.error('Error deleting eduInfo:', error);
    }
    setIsDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false); // Close the confirmation dialog
  };
  
  const handleAddEduInfo = () => {
    setIsDialogOpen(true);
  };

  const handleEditEduInfo = (info) => {
    setEditedEduInfo(info);
    setNewEduInfo({
      degree: info.degree,
      subject: info.subject,
      institution: info.institution,
      result: info.result,
      startDate: info.start_date,
      endDate: info.end_date,
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEduInfo({
      degree: '',
      subject: '',
      institution: '',
      result: '',
      startDate: '',
      endDate: '',
    });
  };

  // Transform the data order to match the backend order
  const transformedData = {
    degree: newEduInfo.degree,
    subject: newEduInfo.subject,
    institution: newEduInfo.institution,
    result: newEduInfo.result,
    start_date: newEduInfo.startDate,
    end_date: newEduInfo.endDate,
  };

  const handleSaveEduInfo = async () => {
    try {
      console.log('newEduInfo: ', newEduInfo);
      const response = await axios.post("http://localhost:3001/api/education", transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response:', response);
      fetchEducationData();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving eduInfo:', error);
    }
  };

  const handleSaveEdit = async () => {
    if (editedEduInfo) {
      console.log('editedEduInfo: ', editedEduInfo);
      try {
        const response = await axios.put(`http://localhost:3001/api/education/${editedEduInfo.degree_id}`, transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        console.log('response: ', response);
        fetchEducationData();
        setEditedEduInfo(null);
        setIsEditDialogOpen(false);
        setNewEduInfo({
          degree: '',
          subject: '',
          institution: '',
          result: '',
          startDate: '',
          endDate: '',
        });
      } catch (error) {
        console.error('Error updating eduInfo:', error);
      }
    }
  };  

  const handleCancelEdit = () => {
    setEditedEduInfo(null);
    setIsEditDialogOpen(false);
    setNewEduInfo({
      degree: '',
      subject: '',
      institution: '',
      result: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <>
      <Box p={0}>
        <ButtonBase
          component="div"
          onClick={handleAddEduInfo}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            cursor: 'pointer',
            marginRight: '20px'
          }}
        >
          <Typography variant="body1">
            Add
          </Typography>
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
        </ButtonBase>
        {eduInfo.length === 0 ? (
          <Typography>No education information available.</Typography>
        ) : (
          <EduInfoTable eduInfo={eduInfo} handleDeleteEduInfo={handleDeleteEduInfo} handleEditEduInfo={handleEditEduInfo} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} handleCancelDelete={handleCancelDelete} isDeleteConfirmationOpen={isDeleteConfirmationOpen} />
        )}
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Education Information</DialogTitle>
        <DialogContent>
          {/* Add text fields for education details */}
          <TextField
            label="Degree"
            fullWidth
            margin="dense"
            value={newEduInfo.degree}
            onChange={(e) => setNewEduInfo({ ...newEduInfo, degree: e.target.value })}
          />
          <TextField
            label="Subject"
            fullWidth
            margin="dense"
            value={newEduInfo.subject}
            onChange={(e) => setNewEduInfo({ ...newEduInfo, subject: e.target.value })}
          />
          <TextField
            label="Institution"
            fullWidth
            margin="dense"
            value={newEduInfo.institution}
            onChange={(e) => setNewEduInfo({ ...newEduInfo, institution: e.target.value })}
          />
          <TextField
            label="Result"
            fullWidth
            margin="dense"
            value={newEduInfo.result}
            onChange={(e) => setNewEduInfo({ ...newEduInfo, result: e.target.value })}
          />
          <TextField
            label="Start Date"
            fullWidth
            margin="dense"
            type="date"
            value={newEduInfo.startDate}
            onChange={(e) => setNewEduInfo({ ...newEduInfo, startDate: e.target.value })}
          />
          <TextField
            label="End Date"
            fullWidth
            margin="dense"
            type="date"
            value={newEduInfo.endDate}
            onChange={(e) => setNewEduInfo({ ...newEduInfo, endDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEduInfo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Education Information</DialogTitle>
        <DialogContent>
          {/* Display existing education info */}
          {editedEduInfo && (
            <Box>
              <TextField
                label="Degree"
                fullWidth
                margin="dense"
                value={newEduInfo.degree}
                onChange={(e) => setNewEduInfo({ ...newEduInfo, degree: e.target.value })}
              />
              <TextField
                label="Subject"
                fullWidth
                margin="dense"
                value={newEduInfo.subject}
                onChange={(e) => setNewEduInfo({ ...newEduInfo, subject: e.target.value })}
              />
              <TextField
                label="Institution"
                fullWidth
                margin="dense"
                value={newEduInfo.institution}
                onChange={(e) => setNewEduInfo({ ...newEduInfo, institution: e.target.value })}
              />
              <TextField
                label="Result"
                fullWidth
                margin="dense"
                value={newEduInfo.result}
                onChange={(e) => setNewEduInfo({ ...newEduInfo, result: e.target.value })}
              />
              <TextField
                label="Start Date"
                fullWidth
                margin="dense"
                type="date"
                value={newEduInfo.startDate}
                onChange={(e) => setNewEduInfo({ ...newEduInfo, startDate: e.target.value })}
              />
              <TextField
                label="End Date"
                fullWidth
                margin="dense"
                type="date"
                value={newEduInfo.endDate}
                onChange={(e) => setNewEduInfo({ ...newEduInfo, endDate: e.target.value })}
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

export default EduInfo;
