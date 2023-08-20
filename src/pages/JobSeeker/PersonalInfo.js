import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import GitHubIcon from '@mui/icons-material/GitHub';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StyledTableCell, StyledTableRow, commonStyles } from './ComponentStyles';
import DateComponent from '../../components/DateComponent';

function PersonalInfo() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageEditMode, setIsImageEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});

  const [jobseekerData, setJobseekerData] = useState(null);
  const [error, setError] = useState(null);

  const id = useParams().jobseeker_id;

  useEffect(() => {
    const fetchJobseekerData = async () => {
      try {
          const response = await axios.get(`http://localhost:3001/api/jobseeker/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setJobseekerData(response.data);
      } catch (error) {
        setError('Error fetching jobseeker information.');

      }
    };
    fetchJobseekerData();

  }, [id]);

  if(!jobseekerData) 
    return (
      <div>Loading...</div>    
      );


  const handleEdit = () => {
    setIsDialogOpen(true);
    setEditedInfo({ ...jobseekerData });
  };

  const handleSave = async () => {
    try {
      setIsDialogOpen(false);
      setIsEditMode(false);
      setIsImageEditMode(false);
  
      // Send editedInfo to the backend
      const response = await axios.put('http://localhost:3001/api/jobseeker', editedInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        // Update jobseekerData with the editedInfo
        setJobseekerData(editedInfo);
      } else {
        console.error('Failed to update jobseeker info.');
      }
    } catch (error) {
      console.error('Error updating jobseeker info:', error);
    }
  };
  

  const handleCancel = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    setIsImageEditMode(false); // Disable image edit mode when canceling
  };

  const handleImageClick = () => {
    setIsImageEditMode(true);
  };


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedInfo({ ...editedInfo, image: e.target.result });
        setJobseekerData({ ...editedInfo, image: e.target.result }); // Save the image as well
        setIsImageEditMode(false); // Disable image edit mode
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Box display="flex">
        <Box p={0} width="100%">
          <Paper elevation={3}>
            <Box p={0} display="flex" alignItems="center" justifyContent="flex-end">
              {isEditMode ? (
                <>
                  <IconButton color="primary" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <IconButton color="primary" onClick={handleEdit} sx={{mt: 4, mr: 4}}>
                 <Typography sx={{mr: 2}}>Edit Info</Typography> <EditIcon />
                </IconButton>
              )}
            </Box>
            <Box p={3} display="flex">
            <Box flex={1}>
                {isImageEditMode ? (
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <label htmlFor="image-upload">
                      {editedInfo.image ? (
                        <img
                          src={editedInfo.image}
                          alt="Profile"
                          style={{ maxWidth: '250px', maxHeight: '250px', borderRadius: '50%', cursor: 'pointer' }}
                        />
                      ) : (
                        <AccountCircleIcon style={{ fontSize: '200px', color: '#757575', cursor: 'pointer' }} />
                      )}
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                    <Button component="label" color="primary">
                      Select New Picture
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                    </Button>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center">
                    {jobseekerData.image ? (
                      <img
                        src={jobseekerData.image}
                        alt="Profile"
                        style={{ maxWidth: '300px', maxHeight: '300px', borderRadius: '50%', cursor: 'pointer' }}
                        onClick={handleImageClick}
                      />
                    ) : (
                      <AccountCircleIcon style={{ fontSize: '200px', color: '#757575', cursor: 'pointer' }} onClick={handleImageClick} />
                    )}
                  </Box>
                )}
              </Box>
              <Box flex={1}>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Name: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Name"
                      value={editedInfo.name || ''}
                      onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                    />
                  ) : (
                    <Typography>{jobseekerData.name}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Gender:</Typography>
                  {isEditMode ? (
                    <FormControl fullWidth variant="outlined" margin="dense">
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={editedInfo.gender || ''}
                        onChange={(e) => setEditedInfo({ ...editedInfo, gender: e.target.value })}
                        label="Gender"
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <Typography>{jobseekerData.gender}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Date of Birth:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      type="date"
                      label="Date of Birth"
                      value={editedInfo.date_of_birth || ''}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, date_of_birth: e.target.value })
                      }
                    />
                  ) : (
                    <Typography><DateComponent isoDate={jobseekerData.date_of_birth}/></Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Nationality:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Nationality"
                      value={editedInfo.nationality || ''}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, nationality: e.target.value })
                      }
                    />
                  ) : (
                    <Typography>{jobseekerData.nationality}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>NID:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="NID"
                      value={editedInfo.nid || ''}
                      onChange={(e) => setEditedInfo({ ...editedInfo, nid: e.target.value })}
                    />
                  ) : (
                    <Typography>{jobseekerData.nid}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Address:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      multiline
                      rows={4}
                      label="Address"
                      value={editedInfo.address || ''}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, address: e.target.value })
                      }
                    />
                  ) : (
                    <Typography>{jobseekerData.address}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Phone No:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Phone No"
                      value={editedInfo.phone_no || ''}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, phone_no: e.target.value })
                      }
                    />
                  ) : (
                    <Typography>{jobseekerData.phone_no}</Typography>
                  )}
                </Box>

                {/* <Box display="flex" alignItems="center">
                  <Typography>GitHub Link:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="GitHub Link"
                      value={editedInfo.githubLink || ''}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, githubLink: e.target.value })
                      }
                    />
                  ) : (
                    <Typography>
                      <a href={jobseekerData.githubLink} target="_blank" rel="noopener noreferrer">
                        <GitHubIcon /> {jobseekerData.githubLink}
                      </a>
                    </Typography>
                  )}
                </Box> */}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCancel} fullWidth maxWidth="md">
        <DialogTitle>Edit Personal Information</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Name"
              value={editedInfo.name || ''}
              onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
            />
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Gender</InputLabel>
              <Select
                value={editedInfo.gender || ''}
                onChange={(e) => setEditedInfo({ ...editedInfo, gender: e.target.value })}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Date of Birth"
              type="date"
              value={editedInfo.dateOfBirth || ''}
              onChange={(e) => setEditedInfo({ ...editedInfo, dateOfBirth: e.target.value })}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Nationality"
              value={editedInfo.nationality || ''}
              onChange={(e) => setEditedInfo({ ...editedInfo, nationality: e.target.value })}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="NID"
              value={editedInfo.nid || ''}
              onChange={(e) => setEditedInfo({ ...editedInfo, nid: e.target.value })}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Address"
              multiline
              rows={4}
              value={editedInfo.address || ''}
              onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Phone No"
              value={editedInfo.phone_no || ''}
              onChange={(e) => setEditedInfo({ ...editedInfo, phone_no: e.target.value })}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="GitHub Link"
              value={editedInfo.githubLink || ''}
              onChange={(e) => setEditedInfo({ ...editedInfo, githubLink: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PersonalInfo;
