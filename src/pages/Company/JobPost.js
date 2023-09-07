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

const JobPost = ({user_id,isCompany,isJobseeker,isLoggedInUser,fetch,setFetch,selectedJob,setSelectedJob}) => {
  console.log("seelectedjob",selectedJob);
  const company_id = useParams().company_id;
  // const [jobPost, setJobPost] = useState(selectedJob);
  // console.log(jobPost);
  const [error, setError] = useState(null);
  const [applications,setApplications] = useState([]);
  const [isLoadingJobPost, setIsLoadingJobPost] = useState(true);

  const fetchJobData = async () => {
    const endpoint = `/api/jobpost/${selectedJob.jobpost_id}`;
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
      console.log(applications);
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
        <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            {selectedJob.title}
          </Typography>
        </Box>
          <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
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
            <Typography variant="body1">{selectedJob.deadline}</Typography>
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
      </Container>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default JobPost;
