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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BookmarkAddTwoToneIcon from '@mui/icons-material/BookmarkAddTwoTone';
import BookmarkAddedTwoToneIcon from '@mui/icons-material/BookmarkAddedTwoTone';
import { StyledTableCell, StyledTableRow, commonStyles } from '../JobSeeker/ComponentStyles';
import DateComponent from '../../components/DateComponent';


const ViewJobPost = () => {
  const jobpost_id = useParams().jobpost_id;
  console.log(jobpost_id);
  const [error, setError] = useState(null);
  const [isLoadingJobPost, setIsLoadingJobPost] = useState(true);
  const [jobPost,setJobPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShortlisted,setIsShortListed] = useState(false);
  const [shortListButtonText,setShortListButtonText] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [applyButtonText,setApplyButtonText] = useState('');
  //---------------------Fetch JobPost ----------------
  const fetchJobPost = async () => {
    try {
      const response = await axios.get(`/api/jobpost/${jobpost_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(response.data);
      setJobPost(response.data);
      setIsLoadingJobPost(false);
    } catch (error) {
      setError('Error fetching jobpost information.');
      setIsLoadingJobPost(false);
    }
  };
  //--------------------------Application---------------------------------

  const fetchIsApplied = async () => {
    const endpoint = `/api/application/is_applied/${jobpost_id}`;
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
    const endpoint = `/api/jobpost/is_shortlisted/${jobpost_id}`;
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
      jobpost_id: jobpost_id,
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
 
  //---------------------------------------------------------------

  useEffect(() => {

      fetchJobPost();
      fetchIsApplied();
      fetchIsShortListed();

  }, [jobpost_id]);

  if(isLoadingJobPost) {
    return (<div>Loading JobPost</div>);
  }

  return (
    <>
    <Header/>
    <div style={{ display: 'flex',marginTop: '70px' }}></div>
    <Container sx={{ marginTop: '40px', marginLeft: '0', marginRight: 'auto' }}>
        <Box p={0} width="100%">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            {jobPost.title}
          </Typography>
        </Box>
          <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
          <Box p={0} display="flex" alignItems="center" justifyContent="flex-end">

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Button variant="contained" startIcon={isShortlisted ? <BookmarkAddedTwoToneIcon /> : <BookmarkAddTwoToneIcon />} onClick={handleShortlist}>
                    {shortListButtonText}
                  </Button>
                </div>

          </Box>
            <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                    <Typography>company: </Typography>
                    
                      <Typography>{jobPost.company_name}</Typography>

                  </Box>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Description: </Typography>
                  
                    <Typography>{jobPost.description}</Typography>

                </Box>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Requirements: </Typography>
 
                    <Typography>{jobPost.requirements}</Typography>

                </Box>


                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Vacancy: </Typography>
                 
                    <Typography>{jobPost.vacancy}</Typography>

                </Box>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Salary: </Typography>
                 
                    <Typography>{jobPost.salary}</Typography>

                </Box>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Employment Type: </Typography>
                 
                    <Typography>{jobPost.employment_type}</Typography>

                </Box>
                <Box display="flex" alignItems="center" sx={{...commonStyles.box}}>
                  <Typography>Application deadline: </Typography>
                  
                    <Typography variant="body1">{new Date(jobPost.deadline).toLocaleDateString()} at{' '}
                    {new Date(jobPost.deadline).toLocaleTimeString([], { timeStyle: 'short' })}</Typography>

                </Box>
            
          </Paper>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Button variant="contained" onClick={handleApply}>
                {applyButtonText}
              </Button>
            </div>
        </Box>


          
      </Container>

    </>
  );
};

export default ViewJobPost;
