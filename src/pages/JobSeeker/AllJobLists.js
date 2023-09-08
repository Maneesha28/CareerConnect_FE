import React, { useState, useEffect } from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  InputAdornment,
  IconButton,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../../components/Header';
import axios from 'axios'; // Import axios for API requests
import { Link } from 'react-router-dom';
import { useFetch } from '../Company/FetchContext';
const drawerWidth = 300;

const CompanyList = ({ companies }) => (
  <Box sx={{ width: '100%' }}>
    <Grid container spacing={2}>
      {companies.map((company) => (
        <Grid item xs={12} key={company.company_name}>
          <Paper elevation={3} sx={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              {company.company_name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {company.about}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Address: {company.address}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Website: <a href={company.website_address}>{company.website_address}</a>
            </Typography>
            <Typography variant="body2" gutterBottom>
              Email: {company.email}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Phone: {company.phone_no}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const AllJobLists = ({user_id,isCompany,isJobseeker,isLoggedInUser,selectedJob,setSelectedJob}) => {
  const { fetch, setFetch } = useFetch();
  const [selectedList, setSelectedList] = useState('Latest Jobs');
  const [jobData, setJobData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [isLoadingJobPost,setIsLoadingJobPost] = useState(false);

  const JobList = ({ jobs}) => (
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item xs={12} key={job.jobpost_id}>
              <Paper elevation={3} sx={{ padding: '16px' }}>
              <div
                onClick={() => {
                  setSelectedJob(job);
                }}
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s, background-color 0.3s', // Add transitions for color and background-color
                  color: 'blue',
                  backgroundColor: 'transparent', // Initial background color
                }}
              >
                <Typography variant="h4" gutterBottom>
                  {job.title}
                </Typography>
              </div>

              <div
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s, background-color 0.3s', // Add transitions for color and background-color
                  color: 'blue',
                  backgroundColor: 'transparent', // Initial background color
                }}
              >
                <Link
                  to={`/companyJobPosts/${job.company_id}`}
                  state={{ jobpost_id: job.jobpost_id }}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography variant="h6" gutterBottom>
                    {job.company_name}
                  </Typography>
                </Link>
              </div>

                <Typography variant="subtitle1" gutterBottom>
                  Vacancy: {job.vacancy}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Salary: {job.salary}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Type: {job.employment_type}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );

  const fetchJobData = async (listType) => {
    try {
      let response;
      switch (listType) {
        case 'Latest Jobs':
          setSearchQuery('');
          setIsLoadingJobPost(true);
          response = await axios.get(`/api/jobpost/recent`);
          break;
        case 'Shortlisted Jobs':
          setSearchQuery('');
          setIsLoadingJobPost(true);
          response = await axios.get(`/api/jobpost/shortlisted`);
          break;
        case 'Followed Jobs':
          setSearchQuery('');
          setIsLoadingJobPost(true);
          response = await axios.get(`/api/jobpost/followed`);
          break;
        case 'Applied Jobs':
          setSearchQuery('');
          setIsLoadingJobPost(true);
          response = await axios.get(`/api/jobpost/applied`);
          break;
        default:
          // Handle other cases or errors
          break;
      }

      const jobdata = response.data;
      setJobData(jobdata);
      console.log(`Fetched ${listType}:`, jobdata);
    } catch (error) {
      setError(`Error fetching ${listType} jobpost information.`);
    }
  };
  //------------------------- search -------------------------
  
  const fetchSearchedJobPosts = async () => {
    try {
      const response = await axios.get(`/api/jobpost/searched?keyword=${searchQuery}`);
      const jobdata = response.data;
      setJobData(jobdata);
      setSelectedList('');
      console.log('Fetched searched job posts:', jobdata);
    } catch (error) {
      setError('Error fetching searched job posts.');
    }
  };
  //-----------------------------------------------------------
  useEffect(() => {
    console.log('In Use Effect: ',selectedList);
    // Fetch data from the database based on the selected list
    if (selectedList === 'Explore Companies') {
      // Handle fetching company data here
      // Example: fetchCompanyData();
    } else {
      fetchJobData(selectedList);
    }
  }, [selectedList]);
  useEffect(()=>{
    if(isLoadingJobPost){
      setIsLoadingJobPost(false);
    }
  },[jobData]);
  useEffect(() => {
    if(fetch){
      if (selectedList === 'Latest Jobs' || selectedList === 'Shortlisted Jobs' ||
      selectedList === 'Followed Jobs' || selectedList === 'Applied Jobs')
        fetchJobData(selectedList);
        setFetch(false);
    }
  }, [fetch]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar /><Toolbar />
        
        <Box sx={{ overflow: 'auto' }}>
        <List>
          {['Latest Jobs', 'Shortlisted Jobs', 'Followed Jobs', 'Applied Jobs'].map((text) => (
            <ListItem
              button
              key={text}
              selected={selectedList === text}
              onClick={() => {
                console.log('Clicked:', text);
                setSelectedList(text);
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <Divider />
          <ListItem
            button
            selected={selectedList === 'Followed Companies'}
            onClick={() => setSelectedList('Followed Companies')}
          >
            <ListItemText primary="Followed Companies" />
          </ListItem>
          <ListItem
            button
            selected={selectedList === 'Explore Companies'}
            onClick={() => setSelectedList('Explore Companies')}
          >
            <ListItemText primary="Explore Companies" />
          </ListItem>
        </List>
        </Box>
      </Drawer>
              
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '50px' }}>
      <Toolbar />
      {/* Search Bar */}
      <TextField
        label="Search Jobs"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && searchQuery.trim() !== '') {
            fetchSearchedJobPosts();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={fetchSearchedJobPosts}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Toolbar />
      {isLoadingJobPost ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        searchQuery ? ( // Display searched jobs when searchQuery is not empty
          <JobList jobs={jobData} />
        ) : (
          selectedList === 'Latest Jobs' || selectedList === 'Shortlisted Jobs' ||
          selectedList === 'Followed Jobs' || selectedList === 'Applied Jobs' ? (
            <JobList jobs={jobData} />
          ) : (
            <CompanyList companies={companyData} />
          )
        )
      )}
    </Box>

    </Box>
  );
};

export default AllJobLists;
