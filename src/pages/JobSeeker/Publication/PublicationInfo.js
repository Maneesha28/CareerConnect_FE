import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PublicationInfoTable from './PublicationInfoTable';
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

function PublicationInfo() {
  const id = useParams().jobseeker_id;
  const [publicationInfo, setPublicationInfo] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedPublicationInfo, setEditedPublicationInfo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingPublication, setIsLoadingPublication] = useState(true);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [newPublicationInfo, setNewPublicationInfo] = useState({
    title: '',
    authors: '',
    journal: '',
    pdfLink: '',
    publicationDate: '',
  });

  const fetchPublicationData = async () => {
    const endpoint = `http://localhost:3000/api/publication/all/${id}`;
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
        setIsLoadingPublication(false);
        return;
      }
      setPublicationInfo(response.data);
      setIsLoadingPublication(false);
    } catch (error) {
      setError(`Error fetching information.`);
      setIsLoadingPublication(false);
    }
  };

  useEffect(() => {
  fetchPublicationData();
  }, [id]);

  if (isLoadingPublication) {
    return <div>Loading...</div>;
  };

  const handleDeletePublicationInfo = async (infoId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/publication/${infoId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response status: ', response.data.status);
      fetchPublicationData();
    } catch (error) {
      console.error('Error deleting publicationInfo:', error);
    }
    setIsDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false); // Close the confirmation dialog
  };

  const handleAddPublicationInfo = () => {
    setIsDialogOpen(true);
  };

  const handleEditPublicationInfo = (info) => {
    setEditedPublicationInfo(info);
    setNewPublicationInfo({
      title: info.title,
      authors: info.authors,
      journal: info.journal,
      pdfLink: info.pdf_link,
      publicationDate: info.publication_date,
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewPublicationInfo({
      title: '',
      authors: '',
      journal: '',
      pdfLink: '',
      publicationDate: '',
    });
  };

  // Transform the data order to match the backend order
  const transformedData = {
    title: newPublicationInfo.title,
    authors: newPublicationInfo.authors,
    journal: newPublicationInfo.journal,
    pdf_link: newPublicationInfo.pdfLink,
    publication_date: newPublicationInfo.publicationDate,
  };

  const handleSavePublicationInfo = async () => {
    try {
      console.log('newPublicationInfo: ', newPublicationInfo);
      const response = await axios.post("http://localhost:3000/api/publication", transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response:', response);
      fetchPublicationData();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving publicationInfo:', error);
    }
  };

  const handleSaveEdit = async () => {
    if (editedPublicationInfo) {
      console.log('editedPublicationInfo: ', editedPublicationInfo);
      try {
        const response = await axios.put(`http://localhost:3000/api/publication/${editedPublicationInfo.publication_id}`, transformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        console.log('response: ', response);
        fetchPublicationData();
        setEditedPublicationInfo(null);
        setIsEditDialogOpen(false);
        setNewPublicationInfo({
          degree: '',
          subject: '',
          institution: '',
          result: '',
          startDate: '',
          endDate: '',
        });
      } catch (error) {
        console.error('Error updating publicationInfo:', error);
      }
    }

    setEditedPublicationInfo(null);
    setIsEditDialogOpen(false);
    setNewPublicationInfo({
      title: '',
      authors: '',
      journal: '',
      pdfLink: '',
      publicationDate: '',
    });
  };

  const handleCancelEdit = () => {
    setEditedPublicationInfo(null);
    setIsEditDialogOpen(false);
    setNewPublicationInfo({
      title: '',
      authors: '',
      journal: '',
      pdfLink: '',
      publicationDate: '',
    });
  };

  return (
    <>
      <Box p={0}>
        <ButtonBase
          component="div"
          onClick={handleAddPublicationInfo}
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
        {publicationInfo.length === 0 ? (
          <Typography>No publication information available.</Typography>
        ) : (
          <PublicationInfoTable publicationInfo={publicationInfo} handleDeletePublicationInfo={handleDeletePublicationInfo} handleEditPublicationInfo={handleEditPublicationInfo} setIsDeleteConfirmationOpen={setIsDeleteConfirmationOpen} handleCancelDelete={handleCancelDelete} isDeleteConfirmationOpen={isDeleteConfirmationOpen} />
        )}
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Publication Information</DialogTitle>
        <DialogContent>
          {/* Add text fields for publication details */}
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newPublicationInfo.title}
            onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, title: e.target.value })}
          />
          <TextField
            label="Authors"
            fullWidth
            margin="dense"
            value={newPublicationInfo.authors}
            onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, authors: e.target.value })}
          />
          <TextField
            label="Journal"
            fullWidth
            margin="dense"
            value={newPublicationInfo.journal}
            onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, journal: e.target.value })}
          />
          <TextField
            label="PDF Link"
            fullWidth
            margin="dense"
            value={newPublicationInfo.pdfLink}
            onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, pdfLink: e.target.value })}
          />
          <TextField
            label="Publication Date"
            fullWidth
            margin="dense"
            type="date"
            value={newPublicationInfo.publicationDate}
            onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, publicationDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSavePublicationInfo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Publication Information</DialogTitle>
        <DialogContent>
          {/* Display existing publication info */}
          {editedPublicationInfo && (
            <Box>
              <TextField
                label="Title"
                fullWidth
                margin="dense"
                value={newPublicationInfo.title}
                onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, title: e.target.value })}
              />
              <TextField
                label="Authors"
                fullWidth
                margin="dense"
                value={newPublicationInfo.authors}
                onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, authors: e.target.value })}
              />
              <TextField
                label="Journal"
                fullWidth
                margin="dense"
                value={newPublicationInfo.journal}
                onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, journal: e.target.value })}
              />
              <TextField
                label="PDF Link"
                fullWidth
                margin="dense"
                value={newPublicationInfo.pdfLink}
                onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, pdfLink: e.target.value })}
              />
              <TextField
                label="Publication Date"
                fullWidth
                margin="dense"
                type="date"
                value={newPublicationInfo.publicationDate}
                onChange={(e) => setNewPublicationInfo({ ...newPublicationInfo, publicationDate: e.target.value })}
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

export default PublicationInfo;
