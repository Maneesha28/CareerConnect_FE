import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import Header from '../../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkAddTwoToneIcon from '@mui/icons-material/BookmarkAddTwoTone';
import BookmarkAddedTwoToneIcon from '@mui/icons-material/BookmarkAddedTwoTone';
import { StyledTableCell, StyledTableRow, commonStyles } from '../JobSeeker/ComponentStyles';
import DateComponent from '../../components/DateComponent';
import { useFetch } from './FetchContext';

const JobPost = ({user_id,isCompany,isJobseeker,isLoggedInUser,selectedJob,setSelectedJob}) => {
  const { fetch, setFetch } = useFetch();
  const company_id = useParams().company_id;
  const [error, setError] = useState(null);
  const [applications,setApplications] = useState([]);
  const [isLoadingJobPost, setIsLoadingJobPost] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const [isShortlisted,setIsShortListed] = useState(false);
  const [shortListButtonText,setShortListButtonText] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [applyButtonText,setApplyButtonText] = useState('');
  //---------------------------Edit---------------------------------------
  const handleSave = async () => {
    try {
      setIsDialogOpen(false);
      setIsEditMode(false);
  
      // Send editedInfo to the backend
      const response = await axios.put(`/api/jobpost/${selectedJob.jobpost_id}`, editedInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setSelectedJob(editedInfo);
      console.log('1)fetch: ',fetch);
      setFetch(true);
    } catch (error) {
      console.error('Error updating jobpost info:', error);
    }
  };

  const handleEdit = () => {
    setIsDialogOpen(true);
    setEditedInfo({ ...selectedJob });
  };
  const handleCancel = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
  };
  //--------------------------Application---------------------------------
  const fetchApplicantsData = async () => {
    const endpoint = `/api/application/${selectedJob.jobpost_id}`;
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
        setIsLoadingJobPost(false);
        return;
      }
      setApplications(response.data);
      console.log("Application: ",response.data);
      setIsLoadingJobPost(false);
    } catch (error) {
      setError(`Error fetching information.`);
      setIsLoadingJobPost(false);
    }
  };
  const fetchIsApplied = async () => {
    const endpoint = `/api/application/is_applied/${selectedJob.jobpost_id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      if(response.data.status === 'Access Denied') {
        setError(response.data.status);
      }
      setIsApplied(response.data.is_applied);
      if(response.data.is_applied == 1){
        setApplyButtonText("Applied");
      }else{
        setApplyButtonText("Apply Now");
      }
      console.log("is applied: ",response.data);
    } catch (error) {
      setError(`Error fetching applied information.`);
    }
  };
  const handleApply = async () => {
    console.log("is applied", isApplied);
    if (isApplied == 0) {
      
    } else if (isApplied == 1) {
      
    }
  };
  //---------------------------Shortlist------------------------

  const fetchIsShortListed = async () => {
    const endpoint = `/api/jobpost/is_shortlisted/${selectedJob.jobpost_id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      if(response.data.status === 'Access Denied') {
        setError(response.data.status);
      }
      setIsShortListed(response.data.is_shortlisted);
      if(response.data.is_shortlisted == 1){
        setShortListButtonText('Shortlisted');
      }else{
        setShortListButtonText('Shortlist');
      }
      console.log("is shortlisted: ",response.data);
    } catch (error) {
      setError(`Error fetching shortlisted information.`);
    }
  };
  
  const handleShortlist = async () => {
    const requestData = {
      jobpost_id: selectedJob.jobpost_id,
    };
    console.log("is shortlisted ", isShortlisted);
    if (isShortlisted == 0) {
      try {
        const response = await axios.post("/api/jobpost/shortlisted", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response.data);
        setShortListButtonText('Shortlisted');
        setIsShortListed(1);
      } catch (error) {
        console.error(error);
      }
    } else if (isShortlisted == 1) {
      try {
        const response = await axios.delete("/api/jobpost/shortlisted", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          data: requestData,
        });
        console.log(requestData);
        console.log(response.data);
        setShortListButtonText('Shortlist');
        setIsShortListed(0);
      } catch (error) {
        console.error(error);
      }
    }
  };
  //----------------------------Delete JobPost-----------------------------
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleDeleteConfirmationOpen = (jobpostId) => {
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteConfirmationClose = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleConfirmDelete = async () => {
    try {
      // Send a DELETE request to delete the job post by its ID
      const response = await axios.delete(`/api/jobpost/${selectedJob.jobpost_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('Job post deleted successfully:', response.data);
      setIsDeleteDialogOpen(false);
      setSelectedJob(null);
      setFetch(true); // Trigger a fetch after deletion
    } catch (error) {
      // Handle error
      console.error('Error deleting job post:', error);
      setIsDeleteDialogOpen(false);
    }
  };
  //---------------------------------------------------------------

  useEffect(() => {
  if(selectedJob){
    fetchApplicantsData();
  
    console.log('2)fetch: ',fetch);
    if(isJobseeker){
      fetchIsApplied();
      fetchIsShortListed();
    }
  }
  }, [selectedJob]);

  if(isLoadingJobPost) {
    return (<div>Loading JobPost</div>);
  }

  return (
    <>
    {selectedJob !== null? (
      <Container sx={{ marginTop: '36px' }}>
        <Box p={0} width="100%">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            {selectedJob.title}
          </Typography>
        </Box>
          <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
          <Box p={0} display="flex" alignItems="center" justifyContent="flex-end">
              {isLoggedInUser && isEditMode && 
                  <>
                  <IconButton color="primary" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </>
              }
              {isLoggedInUser && !isEditMode &&
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEdit}>
                  Edit
                </Button>
                <Button variant="outlined" startIcon={<DeleteIcon />}
                onClick={() => handleDeleteConfirmationOpen(selectedJob.jobpost_id)}
                >
                  Delete
                </Button>
              </div>
              }
              
              {isJobseeker && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Button variant="contained" startIcon={isShortlisted ? <BookmarkAddedTwoToneIcon /> : <BookmarkAddTwoToneIcon />} onClick={handleShortlist}>
                    {shortListButtonText}
                  </Button>
                </div>
              )}
          </Box>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Description: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Description"
                      value={editedInfo.description || ''}
                      onChange={(e) => setEditedInfo({ ...editedInfo, description: e.target.value })}
                    />
                  ) : (
                    <Typography>{selectedJob.description}</Typography>
                  )}
                </Box>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Requirements: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Requirements"
                      value={editedInfo.requirements || ''}
                      onChange={(e) => setEditedInfo({ ...editedInfo, requirements: e.target.value })}
                    />
                  ) : (
                    <Typography>{selectedJob.requirements}</Typography>
                  )}
                </Box>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Vacancy: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      type="number"
                      label="Vacancy"
                      value={editedInfo.vacancy || ''}
                      onChange={(e) => setEditedInfo({ ...editedInfo, vacancy: e.target.value })}
                    />
                  ) : (
                    <Typography>{selectedJob.vacancy}</Typography>
                  )}
                </Box>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Salary: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      type="number"
                      label="Salary"
                      value={editedInfo.salary || ''}
                      onChange={(e) => setEditedInfo({ ...editedInfo, salary: e.target.value })}
                    />
                  ) : (
                    <Typography>{selectedJob.salary}</Typography>
                  )}
                </Box>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Employment Type: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Employment Type"
                      value={editedInfo.employment_type || ''}
                      onChange={(e) => setEditedInfo({ ...editedInfo, employment_type: e.target.value })}
                    />
                  ) : (
                    <Typography>{selectedJob.employment_type}</Typography>
                  )}
                </Box>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Application deadline: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      type="date"
                      label="Application Deadline"
                      value={editedInfo.deadline || ''}
                      onChange={(e) => setEditedInfo({ ...editedInfo, deadline: e.target.value })}
                    />
                  ) : (
                    <Typography variant="body1">{new Date(selectedJob.deadline).toLocaleDateString()} at{' '}
                    {new Date(selectedJob.deadline).toLocaleTimeString([], { timeStyle: 'short' })}</Typography>
                  )}
                </Box>
            
          </Paper>
          {isJobseeker && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Button variant="contained" onClick={handleApply}>
                {applyButtonText}
              </Button>
            </div>
          )}
        </Box>
        {isLoggedInUser && (
        <Paper elevation={3} sx={{ padding: '16px', flex: 1 }}>
            <Typography variant="h6">Applicants:</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <TextField
                label="Search by Applicant's name"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <List>
                {Array.isArray(applications) &&
                  applications.map((applicant) => (
                    <ListItem key={applicant.jobseeker_id}>
                      <ListItemText primary={applicant.name} />
                      <Button variant="outlined" component="a" href={applicant.resume} target="_blank">
                        View Resume
                      </Button>
                    </ListItem>
                  ))}
              </List>
          </Paper>
          )}
          <Dialog open={isDialogOpen} onClose={handleCancel} fullWidth maxWidth="md">
          <DialogTitle>Edit Job Post</DialogTitle>
          <DialogContent>
            <Box>
            {/* <Typography>{selectedJob.jobpost_id}</Typography> */}
              <TextField
                label="Title"
                fullWidth
                margin="dense"
                value={editedInfo.title}
                onChange={(e) => setEditedInfo({ ...editedInfo, title: e.target.value })}
              />
              <TextField
                label="Description"
                fullWidth
                margin="dense"
                multiline
                rows={4}
                value={editedInfo.description}
                onChange={(e) => setEditedInfo({ ...editedInfo, description: e.target.value })}
              />
              <TextField
                label="Requirements"
                fullWidth
                margin="dense"
                multiline
                rows={4}
                value={editedInfo.requirements}
                onChange={(e) => setEditedInfo({ ...editedInfo, requirements: e.target.value })}
              />
              <TextField
                select
                label="Employment Type"
                fullWidth
                margin="dense"
                value={editedInfo.employment_type}
                onChange={(e) => setEditedInfo({ ...editedInfo, employment_type: e.target.value })}
              >
                <MenuItem value="full-time">Full-Time</MenuItem>
                <MenuItem value="part-time">Part-Time</MenuItem>
                <MenuItem value="internship">Internship</MenuItem>
              </TextField>
              <TextField
                label="Vacancy"
                fullWidth
                margin="dense"
                type="number"
                value={editedInfo.vacancy}
                onChange={(e) => setEditedInfo({ ...editedInfo, vacancy: e.target.value })}
              />
              <TextField
                label="Salary"
                fullWidth
                margin="dense"
                type="number"
                value={editedInfo.salary}
                onChange={(e) => setEditedInfo({ ...editedInfo, salary: e.target.value })}
              />
              <TextField
                label="Aplication Deadline"
                fullWidth
                margin="dense"
                type="date"
                value={editedInfo.deadline}
                onChange={(e) => setEditedInfo({ ...editedInfo, deadline: e.target.value })}
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
        <Dialog open={isDeleteDialogOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Delete Job Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
      
      ) : (
        <div>Select A Post to Show</div>
      )}
    </>
  );
};

export default JobPost;
