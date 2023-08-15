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

const eduInfoData = [
  { id: 1, degree: 'Bachelor of Science', subject: 'Computer Science', institution: 'ABC University', result: 'GPA: 3.8', startDate: '2017-09-01', endDate: '2021-05-15' },
  { id: 2, degree: 'Master of Business Administration', subject: 'Business Management', institution: 'XYZ University', result: 'GPA: 3.9', startDate: '2021-09-01', endDate: '2023-05-15' },
  // Add more education info as needed
];

function EduInfo() {
  const [eduInfo, setEduInfo] = useState(eduInfoData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedEduInfo, setEditedEduInfo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newEduInfo, setNewEduInfo] = useState({
    degree: '',
    subject: '',
    institution: '',
    result: '',
    startDate: '',
    endDate: '',
  });

  const handleDeleteEduInfo = (infoId) => {
    setEduInfo(eduInfo.filter((info) => info.id !== infoId));
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
      startDate: info.startDate,
      endDate: info.endDate,
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

  const handleSaveEduInfo = () => {
    setEduInfo([...eduInfo, { ...newEduInfo, id: eduInfo.length + 1 }]);
    handleCloseDialog();
  };

  const handleSaveEdit = () => {
    if (editedEduInfo) {
      const updatedEduInfo = eduInfo.map((info) =>
        info.id === editedEduInfo.id ? { ...info, ...newEduInfo } : info
      );
      setEduInfo(updatedEduInfo);
    }
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
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box p={3}>
          <Paper elevation={3}>
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Education Information
              </Typography>
              <ButtonBase
                component="div"
                onClick={handleAddEduInfo}
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
              {eduInfo.length === 0 ? (
                <Typography>No education information available.</Typography>
              ) : (
                <List>
                  {eduInfo.map((info) => (
                    <ListItem key={info.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <ListItemText
                          primary={`${info.degree} in ${info.subject}`}
                          secondary={`${info.institution} | ${info.result} | ${info.startDate} - ${info.endDate}`}
                        />
                      </Box>
                      <Box>
                        <IconButton color="error" onClick={() => handleDeleteEduInfo(info.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEditEduInfo(info)}>
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
