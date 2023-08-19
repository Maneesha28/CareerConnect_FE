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
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Header from '../../components/Header';
import Sidebar_Company from '../../components/Sidebar_Company';

function CompanyInfo() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageEditMode, setIsImageEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'ABC Corp',
    description: 'A leading technology company',
    address: '123 Main St, City, Country',
    website: 'https://www.example.com',
    phoneNo: '123-456-7890',
    tradeLicense: '123456789',
    companyLogo: '',
  });

  const handleEdit = () => {
    setIsDialogOpen(true);
    setEditedInfo({ ...companyInfo });
  };

  const handleSave = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    setIsImageEditMode(false); // Disable image edit mode when saving
    setCompanyInfo(editedInfo);
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
        setEditedInfo({ ...editedInfo, companyLogo: e.target.result });
        setCompanyInfo({ ...editedInfo, companyLogo: e.target.result }); // Save the image as well
        setIsImageEditMode(false); // Disable image edit mode
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />
      <Box display="flex">
        <Sidebar_Company />
        <Box p={3} width="80%">
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box display="flex" alignItems="center">
              <Box flex="1">
                <Typography variant="h6">Company Information</Typography>
              </Box>
              {isEditMode ? (
                <Box>
                  <IconButton color="primary" onClick={handleSave} sx={{ mr: 1 }}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              ) : (
                <IconButton color="primary" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>
            <Box display="flex">
              <Box flex="1">
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">Company Name:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Company Name"
                      value={editedInfo.companyName || ''}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, companyName: e.target.value })
                      }
                    />
                  ) : (
                    <Typography variant="body1">{companyInfo.companyName}</Typography>
                  )}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">Description:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Description"
                      value={editedInfo.description || ''}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, description: e.target.value })
                      }
                    />
                  ) : (
                    <Typography variant="body1">{companyInfo.description}</Typography>
                  )}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">Address:</Typography>
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
                    <Typography variant="body1">{companyInfo.address}</Typography>
                  )}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">Website:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Website"
                      value={editedInfo.website || ''}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, website: e.target.value })
                      }
                    />
                  ) : (
                    <Typography variant="body1">
                      <a
                        href={companyInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {companyInfo.website}
                      </a>
                    </Typography>
                  )}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">Phone No:</Typography>
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
                    <Typography variant="body1">{companyInfo.phoneNo}</Typography>
                  )}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">Trade License:</Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Trade License"
                      value={editedInfo.tradeLicense || ''}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, tradeLicense: e.target.value })
                      }
                    />
                  ) : (
                    <Typography variant="body1">
                      {companyInfo.tradeLicense}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box>
                {isImageEditMode ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <label htmlFor="image-upload">
                      {editedInfo.companyLogo ? (
                        <Avatar
                          src={editedInfo.companyLogo}
                          alt="Company Logo"
                          sx={{
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            cursor: 'pointer',
                          }}
                        />
                      ) : (
                        <AccountCircleIcon
                          sx={{
                            fontSize: 200,
                            color: '#757575',
                            cursor: 'pointer',
                          }}
                        />
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
                      Select New Logo
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
                    {companyInfo.companyLogo ? (
                      <Avatar
                        src={companyInfo.companyLogo}
                        alt="Company Logo"
                        sx={{
                          width: 200,
                          height: 200,
                          borderRadius: '50%',
                          cursor: 'pointer',
                        }}
                        onClick={handleImageClick}
                      />
                    ) : (
                      <AccountCircleIcon
                        sx={{
                          fontSize: 200,
                          color: '#757575',
                          cursor: 'pointer',
                        }}
                        onClick={handleImageClick}
                      />
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCancel} fullWidth maxWidth="md">
        <DialogTitle>Edit Company Information</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Company Name"
              value={editedInfo.companyName || ''}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, companyName: e.target.value })
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Description"
              value={editedInfo.description || ''}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, description: e.target.value })
              }
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
              label="Website"
              value={editedInfo.website || ''}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, website: e.target.value })
              }
            />
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
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Trade License"
              value={editedInfo.tradeLicense || ''}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, tradeLicense: e.target.value })
              }
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

export default CompanyInfo;
