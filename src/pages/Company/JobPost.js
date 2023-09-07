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

const JobPost = ({user_id,isCompany,isJobseeker,isLoggedInUser,fetch,setFetch,selectedJob,setSelectedJob}) => {
  console.log(isLoggedInUser,"seelectedjob",selectedJob);
  const company_id = useParams().company_id;
  const [error, setError] = useState(null);
  const [applications,setApplications] = useState([]);
  const [isLoadingJobPost, setIsLoadingJobPost] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const [isShortlisted,setIsShortListed] = useState(false);
  const [shortListButtonText,setShortListButtonText] = useState('');

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
  
      if (response.status === 200) {
        // Update jobseekerData with the editedInfo
        setSelectedJob(editedInfo);
      } else {
        console.error('Failed to update jobpost info.');
      }
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

  useEffect(() => {
  //fetchJobData();
  fetchApplicantsData();
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
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </div>
              }
              {/* {
                isJobseeker && 
              } */}
              
          </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ marginTop: '16px' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Job Description:
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginLeft: '8px' }}>
                    {selectedJob.description}
                  </Typography>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Job Requirements:
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginLeft: '8px' }}>
                    {selectedJob.requirements}
                  </Typography>
                </div>
              </div>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              Vacancy:
            </Typography>
            <Typography variant="body1">{selectedJob.vacancy}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              Application Deadline:
            </Typography>
            <Typography variant="body1">{new Date(selectedJob.deadline).toLocaleDateString()} at{' '}
            {new Date(selectedJob.deadline).toLocaleTimeString([], { timeStyle: 'short' })}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              Employment Type:
            </Typography>
            <Typography variant="body1">{selectedJob.employment_type}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              Salary:
            </Typography>
            <Typography variant="body1">{selectedJob.salary}</Typography>
          </Paper>
          {/* Applicants List */}
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
      </Container>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default JobPost;
