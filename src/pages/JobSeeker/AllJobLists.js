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
import Rating from '@mui/material/Rating';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../../components/Header';
import axios from 'axios'; // Import axios for API requests
import { Link } from 'react-router-dom';
import { useFetch } from '../Company/FetchContext';
const drawerWidth = 350;

const AllJobLists = ({user_id,isCompany,isJobseeker,isLoggedInUser,selectedJob,setSelectedJob,showCompany,setShowCompany,isSelectedListEmpty,setIsSelectedListEmpty}) => {
  const { fetch, setFetch } = useFetch();
  const [selectedList, setSelectedList] = useState('Latest Jobs');
  const [jobData, setJobData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [companyData2, setCompanyData2] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [isLoadingJobPost,setIsLoadingJobPost] = useState(false);
  const [isLoadingCompanies,setIsLoadingCompanies] = useState(false);

  const JobList = ({ jobs}) => (
    <div
        style={{
          height: '800px', // Adjust the height as needed
          overflowY: 'auto',
        }}
      >
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
  </div>
);
const CompanyList = ({ companies }) => (
  <div
    style={{
      height: '800px', // Adjust the height as needed
      overflowY: 'auto',
    }}
  >
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={8}>
        {companies.map((company) => (
          <Grid item xs={12} sm={6} key={company.company_id}>
            <Paper
              elevation={3}
              sx={{
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                height: '100%', // Set a fixed height for the cards
              }}
            >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column', // Display text elements in a column
                    alignItems: 'flex-start', // Align text elements to the left
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.3s, background-color 0.3s',
                    color: 'blue',
                    backgroundColor: 'transparent',
                    marginBottom: '16px', // Add spacing between cards
                  }}
                >
                  <Link to={`/company/${company.company_id}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="h4" gutterBottom>
                      {company.company_name}
                    </Typography>
                  </Link>
                  {company.avg_stars && (
                    <Rating name="read-only" value={company.avg_stars} readOnly />
                  )}
                </div>
                {company.about && (
                  <Typography variant="body0" gutterBottom>
                    {company.about}
                  </Typography>
                )}
                {company.address && (
                  <Typography variant="body1" gutterBottom>
                    Address: {company.address}
                  </Typography>
                )}
                {company.website_address && (
                  <Typography variant="body1" gutterBottom>
                    Website: <a href={company.website_address}>{company.website_address}</a>
                  </Typography>
                )}
                {company.phone_no && (
                  <Typography variant="body1" gutterBottom>
                    Phone: {company.phone_no}
                  </Typography>
                )}
              </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  </div>
);
    
    

  const fetchJobData = async (listType) => {
    try {
      let response;
      switch (listType) {
        case 'Latest Jobs':
          setIsLoadingJobPost(true);
          response = await axios.get(`/api/jobpost/recent`);
          break;
        case 'Shortlisted Jobs':
          setIsLoadingJobPost(true);
          response = await axios.get(`/api/jobpost/shortlisted`);
          break;
        case 'Followed Jobs':
          setIsLoadingJobPost(true);
          response = await axios.get(`/api/jobpost/followed`);
          break;
        case 'Applied Jobs':
          setIsLoadingJobPost(true);
          response = await axios.get(`/api/jobpost/applied`);
          break;
        default:
          // Handle other cases or errors
          break;
      }

      const jobdata = response.data;
      if (jobdata.length > 0) {
        setSelectedJob(jobdata[0]);
      } else {
        setIsSelectedListEmpty(true);
        setSelectedJob(null);
      }
      setJobData(jobdata);
      console.log(`Fetched ${listType}:`, jobdata);
    } catch (error) {
      setError(`Error fetching ${listType} jobpost information.`);
    }
  };
  const fetchCompanyData = async (listType) => {
    try {
      let response;
      switch (listType) {
        case 'Followed Companies':
          setIsLoadingCompanies(true);
          response = await axios.get(`/api/follow/followings/${user_id}`);
          break;
        case 'Explore Companies':
          setIsLoadingCompanies(true);
          response = await axios.get(`/api/company/all`);
          break;
        default:
          // Handle other cases or errors
          break;
      }

      const companydata = response.data;
      // if (jobdata.length > 0) {
      //   setSelectedJob(jobdata[0]);
      // } else {
      //   setSelectedJob(null);
      // }
      setCompanyData(companydata);
      setCompanyData2(companydata);
      console.log(`Fetched ${listType}:`, companydata);
    } catch (error) {
      setError(`Error fetching ${listType} company information.`);
    }
  };
  //------------------------- search -------------------------
  
  const fetchSearchedJobPosts = async () => {
    setShowCompany(false);
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
  const fetchSearchedCompany = () => {
    if (searchQuery) {
      // Filter the companies based on the searchQuery
      const filteredCompanies = companyData2.filter((company) => {
        const query = searchQuery.toLowerCase();
  
        // Check if the search query is present in any of the company's properties (with null checks)
        return (
          (company.address?.toLowerCase().includes(query) || false) ||
          (company.phone_no?.toLowerCase().includes(query) || false) ||
          (company.website_address?.toLowerCase().includes(query) || false) ||
          (company.trade_license?.toLowerCase().includes(query) || false) ||
          (company.about?.toLowerCase().includes(query) || false) ||
          (company.company_name?.toLowerCase().includes(query) || false)
        );
      });
  
      // Update the companyData state with the filtered companies
      setCompanyData(filteredCompanies);
    } else {
      // If searchQuery is empty or contains only whitespace, reset to the original data
      setCompanyData(companyData2);
    }
  };  
  
  //-----------------------------------------------------------
  useEffect(() => {
    console.log('In Use Effect: ',selectedList);
    if (selectedList === 'Explore Companies' || selectedList === 'Followed Companies') {
      setSearchQuery('');
      setShowCompany(true);
      fetchCompanyData(selectedList);
      setSelectedJob(null);
    } else if(selectedList === 'Latest Jobs' || selectedList === 'Shortlisted Jobs' ||
    selectedList === 'Followed Jobs' || selectedList === 'Applied Jobs'){
      setSearchQuery('');
      setShowCompany(false);
      fetchJobData(selectedList);
    }else if(selectedList === ''){
      
    }
  }, [selectedList]);
  useEffect(()=>{
    if(isLoadingJobPost){
      setIsLoadingJobPost(false);
    }
  },[jobData]);
  useEffect(()=>{
    if(isLoadingCompanies){
      setIsLoadingCompanies(false);
    }
  },[companyData]);
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
            backgroundColor: '#124559',
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
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#3B7A9F',
                  },
                  marginBottom: 2, // Add margin between list items
                }}
              >
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    variant: 'h6',
                    sx: {
                      fontFamily: 'Times New Roman, serif',
                      fontWeight: 'bold',
                      fontSize: '1.8rem',
                      color: 'white',
                      transition: 'color 0.3s, background-color 0.3s',
                    },
                  }}
                />
              </ListItem>
            ))}
            <Divider />
            <ListItem
              button
              selected={selectedList === 'Followed Companies'}
              onClick={() => setSelectedList('Followed Companies')}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#3B7A9F',
                },
                marginBottom: 2, // Add margin between list items
              }}
            >
              <ListItemText
                primary="Followed Companies"
                primaryTypographyProps={{
                  variant: 'h6',
                  sx: {
                    fontFamily: 'Times New Roman, serif',
                    fontWeight: 'bold',
                    fontSize: '1.8rem',
                    color: 'white',
                    transition: 'color 0.3s, background-color 0.3s',
                  },
                }}
              />
            </ListItem>
            <ListItem
              button
              selected={selectedList === 'Explore Companies'}
              onClick={() => setSelectedList('Explore Companies')}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#3B7A9F',
                },
                marginBottom: 2, // Add margin between list items
              }}
            >
              <ListItemText
                primary="Explore Companies"
                primaryTypographyProps={{
                  variant: 'h6',
                  sx: {
                    fontFamily: 'Times New Roman, serif',
                    fontWeight: 'bold',
                    fontSize: '1.8rem',
                    color: 'white',
                    transition: 'color 0.3s, background-color 0.3s',
                  },
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>




              
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '50px' }}>
      <Toolbar />
      {/* Search Bar */}
      <TextField
  label={showCompany ? 'Search Company' : 'Search Jobs'} // Change the label based on showCompany
  variant="outlined"
  fullWidth
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyPress={(e) => {
    if (e.key === 'Enter') {
      if (showCompany) {
        fetchSearchedCompany(); // Call fetchSearchedCompany if showCompany is true
      } else {
        fetchSearchedJobPosts(); // Call fetchSearchedJobPosts if showCompany is false
      }
    }
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={showCompany ? fetchSearchedCompany : fetchSearchedJobPosts}>
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
        searchQuery ? (
          showCompany ? (
            // Display companyData when searchQuery is not empty and showCompany is true
            <CompanyList companies={companyData} />
          ) : (
            // Display jobData when searchQuery is not empty and showCompany is false
            <JobList jobs={jobData} />
          )
        ) : (
          // Display based on selectedList if searchQuery is empty
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
