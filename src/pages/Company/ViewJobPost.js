import React, { useState, useEffect,useContext,useRef } from 'react';
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
  Drawer,
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
import { NotificationContext } from "../../context/notificationContext";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const ViewJobPost = () => {
  const location = useLocation();
  const {loggedInUser} = useContext(NotificationContext);
  console.log("value from context",loggedInUser);
  // const jobpost_id = location.state?.jobpost_id;
  // console.log("inside jobpost, jobpost_id" ,location.state?.jobpost_id);
  const jobpost_id = useParams().jobpost_id;
  const [error, setError] = useState(null);
  const { allNotifications, setAllNotifications, unreadNotifications, setUnreadNotifications, unreadNotificationsCount, setUnreadNotificationsCount } = useContext(NotificationContext);
  const [isNotificationLoaded,setIsNotificationLoaded] = useState(false);
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
  //-------------------------Apply JobPost -------------------------------
     
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [resume,setResume] = useState({
    'jobpost_id': '',
    'resume': '',
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleApply = () => {
    // Open the apply dialog
    if(isApplied == 0) setIsApplyDialogOpen(true);
  };

  const sendResumeToBackend = async (resume) => {
    try {
        console.log('resume: ', resume);
        const response = await axios.post('/api/application', resume, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setResume({
        'jobpost_id': '',
        'resume': '',
      });
      console.log(response.data);
      setIsApplied(1);
      setApplyButtonText('Applied');
    } catch (error) {
      console.error(error);
    }
  };

  async function uploadFileToFirebase(file) {
    try {
      // Generate a unique filename using UUID
      const uniqueFilename = `${uuidv4()}_${file.name}`;
      
      const storageRef = ref(storage, `applications/${uniqueFilename}`);
      await uploadBytes(storageRef, file);
  
      const downloadURL = await getDownloadURL(storageRef);
  
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file to Firebase:', error);
      throw error;
    }
  }

  const handleUploadResume = () => {
    // Create an input element dynamically
    const input = document.createElement('input');
    input.type = 'file';
  
    // Listen for the 'change' event when the user selects a file
    input.addEventListener('change', async (e) => {
      const selectedFile = e.target.files[0];
  
      // Close the dialog
      setIsApplyDialogOpen(false);
      
      if (selectedFile) {
        try {
          // Upload the file to Firebase Storage and get the download URL
          const downloadURL = await uploadFileToFirebase(selectedFile);         
          // Now, you have the download URL for the uploaded file, which you can use or store as needed
          console.log('Uploaded resume to Firebase. Download URL:', downloadURL);
          setResume({
            'jobpost_id': jobpost_id,
            'resume': downloadURL
          });
          //console.log('resume before sending to backend: ',resume);
          //await sendResumeToBackend(resume);
        } catch (error) {
          console.error('Error uploading resume to Firebase:', error);
        }
      }
    });
    // Trigger a click event on the input element to open the file selection dialog
    input.click();
  };
  

  const handleBuildResume = () => {
    // Open the resume builder link in a new tab
    window.open(`/application/${user_id}`, '_blank');
    // Close the dialog
    setIsApplyDialogOpen(false);
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {

      fetchJobPost();
      fetchIsApplied();
      fetchIsShortListed();
      console.log(allNotifications);
  }, [jobpost_id]);
  useEffect(() => {
    // Check if the resume state has changed and is not null
    if (resume && resume.resume && resume.jobpost_id) {
      sendResumeToBackend(resume);
    }
  }, [resume]);
  
  if(isLoadingJobPost) {
    return (<div>Loading JobPost</div>);
  }

// ... (previous code)

return (
  <>
    <Header />
    <div style={{ marginTop: '70px', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '70%' }}>
        <Box p={0}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              {jobPost.title}
            </Typography>
          </Box>
          <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
            <Box p={0} display="flex" alignItems="center" justifyContent="flex-end">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button
                  variant="contained"
                  startIcon={isShortlisted ? <BookmarkAddedTwoToneIcon /> : <BookmarkAddTwoToneIcon />}
                  onClick={handleShortlist}
                >
                  {shortListButtonText}
                </Button>
              </div>
            </Box>
            <Box display="flex" alignItems="center" sx={{ ...commonStyles.box }}>
              <Typography>company: </Typography>
              <Link
                to={`/company/${jobPost.company_id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography>{jobPost.company_name}</Typography>
              </Link>
            </Box>
            <Box display="flex" alignItems="center" sx={{ ...commonStyles.box }}>
              <Typography>Description: </Typography>
              <Typography>{jobPost.description}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ ...commonStyles.box }}>
              <Typography>Requirements: </Typography>
              <Typography>{jobPost.requirements}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ ...commonStyles.box }}>
              <Typography>Vacancy: </Typography>
              <Typography>{jobPost.vacancy}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ ...commonStyles.box }}>
              <Typography>Salary: </Typography>
              <Typography>{jobPost.salary}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ ...commonStyles.box }}>
              <Typography>Employment Type: </Typography>
              <Typography>{jobPost.employment_type}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ ...commonStyles.box }}>
              <Typography>Application deadline: </Typography>
              <Typography variant="body1">
                {new Date(jobPost.deadline).toLocaleDateString()} at{' '}
                {new Date(jobPost.deadline).toLocaleTimeString([], { timeStyle: 'short' })}
              </Typography>
            </Box>
          </Paper>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {isApplied == 0 && (
                <Button variant="contained" onClick={handleApply}>
                {applyButtonText}
              </Button>)
                }
              {isApplied == 1 && (
                <Button variant="contained" disabled style={{backgroundColor: '#4CAF50'}}>
                {applyButtonText}
              </Button>)
                }
            </div>
        </Box>
        <Dialog open={isApplyDialogOpen} onClose={() => setIsApplyDialogOpen(false)} maxWidth="md" fullWidth>
    <DialogTitle>Apply for the Job</DialogTitle>
    <DialogContent>
      <DialogContentText>Choose how you want to apply for this job:</DialogContentText>
      <div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleUploadResume} sx={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          Upload Resume
        </Button>
        <Button variant="contained" onClick={handleBuildResume} sx={{ fontSize: '1.2rem' }}>
          Build Resume
        </Button>
      </div>
      {/* Add the file input element */}
      <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setIsApplyDialogOpen(false)} color="primary">
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
      </div>

      <div style={{ display: 'flex', marginTop: '70px', justifyContent: 'space-between' }}>

      <div style={{ width: '500px', overflowY: 'auto', maxHeight: '700px' }}>
    <Paper elevation={3} style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
        <Divider/>
        <Typography variant="h4" style={{ marginBottom: '16px' }}>
          All Notifications
        </Typography>
        <Divider/>
      </div>
      <List>
        {allNotifications.map((notification) => (
          <a
            key={notification.notification_id}
            href={
              notification.notification_type === 'jobpost'
                ? `/viewJobPost/${notification.related_id}`
                : `/jobseeker/${notification.related_id}`
            }
            style={{ textDecoration: 'none' }}
          >
            <ListItem>
              <ListItemText>
                <Typography variant="h6" style={{ fontSize: '20px' }}>
                  {notification.text}
                </Typography>
              </ListItemText>
            </ListItem>
          </a>
        ))}
      </List>
    </Paper>
  </div>
  </div>



    </div>
  </>
);

            }
export default ViewJobPost;
