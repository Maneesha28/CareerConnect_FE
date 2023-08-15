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

const workInfoData = [
  { id: 1, organization: 'ABC Corporation', designation: 'Software Engineer', employmentType: 'Full-Time', startDate: '2022-01-15', endDate: '2022-12-31' },
  { id: 2, organization: 'XYZ Tech', designation: 'Frontend Developer', employmentType: 'Contract', startDate: '2021-05-01', endDate: '2021-11-30' },
  // Add more work info as needed
];

function WorkInfo() {
  const [workInfo, setWorkInfo] = useState(workInfoData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedWorkInfo, setEditedWorkInfo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newWorkInfo, setNewWorkInfo] = useState({
    organization: '',
    designation: '',
    employmentType: '',
    startDate: '',
    endDate: '',
  });

  const handleDeleteWorkInfo = (infoId) => {
    setWorkInfo(workInfo.filter((info) => info.id !== infoId));
  };

  const handleAddWorkInfo = () => {
    setIsDialogOpen(true);
  };

  const handleEditWorkInfo = (info) => {
    setEditedWorkInfo(info);
    setNewWorkInfo({
      organization: info.organization,
      designation: info.designation,
      employmentType: info.employmentType,
      startDate: info.startDate,
      endDate: info.endDate,
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

  const handleSaveWorkInfo = () => {
    setWorkInfo([...workInfo, { ...newWorkInfo, id: workInfo.length + 1 }]);
    handleCloseDialog();
  };

  const handleSaveEdit = () => {
    if (editedWorkInfo) {
      const updatedWorkInfo = workInfo.map((info) =>
        info.id === editedWorkInfo.id ? { ...info, ...newWorkInfo } : info
      );
      setWorkInfo(updatedWorkInfo);
    }
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
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box p={3}>
          <Paper elevation={3}>
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Work Information
              </Typography>
              <ButtonBase
                component="div"
                onClick={handleAddWorkInfo}
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
              {workInfo.length === 0 ? (
                <Typography>No work information available.</Typography>
              ) : (
                <List>
                  {workInfo.map((info) => (
                    <ListItem key={info.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <ListItemText
                          primary={`${info.designation} at ${info.organization}`}
                          secondary={
                            <>
                              <div>Employment Type: {info.employmentType}</div>
                              <div>
                                Dates: {info.startDate} - {info.endDate}
                              </div>
                            </>
                          }
                        />
                      </Box>
                      <Box>
                        <IconButton color="error" onClick={() => handleDeleteWorkInfo(info.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEditWorkInfo(info)}>
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
