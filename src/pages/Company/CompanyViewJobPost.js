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

// Sample data for job and applicants (replace with actual data from API)
const jobData = {
  jobTitle: 'Software Engineer',
  jobDescription: 'This is a software engineer position...',
  jobRequirements: ['Bachelor\'s degree in Computer Science', 'Experience with JavaScript frameworks'],
  vacancy: 3,
  applicationDeadline: '2023-09-30',
  employmentType: 'Full-time',
  salary: '80000',
};

const applicantsData = [
  { id: 1, name: 'John Doe', resumeLink: 'link_to_resume_1' },
  { id: 2, name: 'Jane Smith', resumeLink: 'link_to_resume_2' },
  { id: 3, name: 'Alex Johnson', resumeLink: 'link_to_resume_3' },
  // Add more applicants here...
];

const CompanyViewJobPost = () => {
  const [isJobDetailsDialogOpen, setIsJobDetailsDialogOpen] = useState(false);
  const id = useParams().jobpost_id;
  const [jobPost, setJobPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadingJobPost, setIsLoadingJobPost] = useState(true);

  const fetchJobData = async () => {
    const endpoint = `/api/jobpost/${id}`;
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
      setJobPost(response.data);
      setIsLoadingJobPost(false);
    } catch (error) {
      setError(`Error fetching information.`);
      setIsLoadingJobPost(false);
    }
  };

  useEffect(() => {
  fetchJobData();
  }, [id]);

  const handleJobDetailsDialogOpen = () => {
    setIsJobDetailsDialogOpen(true);
  };

  const handleJobDetailsDialogClose = () => {
    setIsJobDetailsDialogOpen(false);
  };

  if(isLoadingJobPost) {
    return (<div>Loading...</div>);
  }

  return (
    <>
      <Header />
      <Container sx={{ marginTop: '36px' }}>
        <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            {jobPost.title}
          </Typography>
        </Box>
        {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            Applicants' List
          </Typography>
        </Box> */}
          <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Job title:
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginLeft: '8px' }}>
                    {jobPost.title}
                  </Typography>
                </div> */}
                <div style={{ marginTop: '16px' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Job Description:
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginLeft: '8px' }}>
                    {jobPost.description}
                  </Typography>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Job Requirements:
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginLeft: '8px' }}>
                    {jobPost.requirements}
                  </Typography>
                </div>
              </div>
            </Box>
            {/* <Button onClick={handleJobDetailsDialogOpen}>View More</Button> */}
          </Paper>
        </Box>
        <Box sx={{ display: 'flex', marginBottom: '16px' }}>
          {/* Sidebar */}
          <Paper elevation={3} sx={{ width: '30%', padding: '16px', marginRight: '16px' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              Vacancy:
            </Typography>
            <Typography variant="body1">{jobPost.vacancy}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              Application Deadline:
            </Typography>
            <Typography variant="body1">{jobPost.deadline}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              Employment Type:
            </Typography>
            <Typography variant="body1">{jobPost.employment_type}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              Salary:
            </Typography>
            <Typography variant="body1">{jobPost.salary}</Typography>
          </Paper>
          {/* Applicants List */}
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
              {applicantsData.map((applicant) => (
                <ListItem key={applicant.id}>
                  <ListItemText primary={applicant.name} />
                  <Button variant="outlined" component="a" href={applicant.resumeLink} target="_blank">
                    View Resume
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
      {/* Job Details Dialog */}
      {/* <Dialog open={isJobDetailsDialogOpen} onClose={handleJobDetailsDialogClose}>
        <DialogTitle>Job Details</DialogTitle>
        <DialogContent>
          <DialogContentText>{jobPost.description}</DialogContentText>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            Job Requirements:
          </Typography> */}
          {/* {jobPost.requirements.map((requirement, index) => (
            <Typography key={index} variant="body2">{`${index + 1}. ${requirement}`}</Typography>
          ))} */}
        {/* </DialogContent>
        <DialogActions>
          <Button onClick={handleJobDetailsDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default CompanyViewJobPost;
