import React, { useState } from 'react';
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
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function PersonalInfo() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageEditMode, setIsImageEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    gender: 'Male',
    dateOfBirth: '1990-01-01',
    nationality: 'United States',
    nid: '123456789',
    address: '123 Main St, City, Country',
    phoneNo: '123-456-7890',
    githubLink: 'https://github.com/johndoe',
    image: '',
  });

  const handleEdit = () => {
    setIsDialogOpen(true);
    setEditedInfo({ ...personalInfo });
  };

  const handleSave = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    setIsImageEditMode(false); // Disable image edit mode when saving
    setPersonalInfo(editedInfo);
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
        setPersonalInfo({ ...editedInfo, image: e.target.result }); // Save the image as well
        setIsImageEditMode(false); // Disable image edit mode
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box p={3} width="80%">
          <Paper elevation={3}>
            <Box p={3} display="flex" alignItems="center">
              <Box flex="1">
                <Typography variant="h6">Personal Information</Typography>
              </Box>
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
                <IconButton color="primary" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>
            <Box p={3} display="flex">
              <Box flex="1">
                <Box display="flex" alignItems="center">
                  <Typography>Name:</Typography>
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
                    <Typography>{personalInfo.name}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center">
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
                    <Typography>{personalInfo.gender}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center">
                  <Typography>Date of Birth:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      type="date"
                      label="Date of Birth"
                      value={editedInfo.dateOfBirth || ''}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, dateOfBirth: e.target.value })
                      }
                    />
                  ) : (
                    <Typography>{personalInfo.dateOfBirth}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center">
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
                    <Typography>{personalInfo.nationality}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center">
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
                    <Typography>{personalInfo.nid}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center">
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
                    <Typography>{personalInfo.address}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center">
                  <Typography>Phone No:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Phone No"
                      value={editedInfo.phoneNo || ''}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, phoneNo: e.target.value })
                      }
                    />
                  ) : (
                    <Typography>{personalInfo.phoneNo}</Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center">
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
                      <a href={personalInfo.githubLink} target="_blank" rel="noopener noreferrer">
                        <GitHubIcon /> {personalInfo.githubLink}
                      </a>
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box>
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
                    {personalInfo.image ? (
                      <img
                        src={personalInfo.image}
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
              value={editedInfo.phoneNo || ''}
              onChange={(e) => setEditedInfo({ ...editedInfo, phoneNo: e.target.value })}
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
