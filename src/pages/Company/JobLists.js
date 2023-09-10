import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  Checkbox,
  Slider,
  FormGroup,
  FormControlLabel,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useFetch } from './FetchContext';

const JobLists = ({user_id,isCompany,isJobseeker,isLoggedInUser,selectedJob,setSelectedJob,selectedTab,setSelectedTab}) => {
  const { fetch, setFetch } = useFetch();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [jobPostData,setJobPostData] = useState([]);
  const [archivedJobPostData,setArchivedJobPostData] = useState([]);
  const [jobsToShow, setJobsToShow] = useState([]);
  const [minSalary, setMinSalary] = useState(Infinity);
  const [maxSalary, setMaxSalary] = useState(0);
  const [salaryRange, setSalaryRange] = useState([minSalary, maxSalary]);
  const [jobTypeFilters, setJobTypeFilters] = useState({
    fullTime: true,
    partTime: true,
    internship: true,
  });
  const [isLoadingJobPost, setIsLoadingJobPost] = useState(true);
  const [isLoadingArchivedJobPost, setIsLoadingArchivedJobPost] = useState(true);
  const [error, setError] = useState('');
  const id = useParams().company_id;

  const [applyFilter,setApplyFilter] = useState(true);

  function updateMinMaxSalary(jobData) {
    let min = Math.min(...jobData.map(job => job.salary));
    let max = Math.max(...jobData.map(job => job.salary));
    setMinSalary(Math.min(min, minSalary));
    setMaxSalary(Math.max(max, maxSalary));
  }
  const fetchJobPostData = async () => {
    try {
      const response = await axios.get(`/api/jobpost/all/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const jobData = response.data;
      setJobPostData(jobData);
      console.log(jobData);
      setIsLoadingJobPost(false);
    } catch (error) {
      setError('Error fetching jobpost information.');
      setIsLoadingJobPost(false);
    }
  };
  const fetchArchivedJobPostData = async () => {
    try {
      const response = await axios.get(`/api/jobpost/archived/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setArchivedJobPostData(response.data);
      setIsLoadingArchivedJobPost(false);
    } catch (error) {
      setError('Error fetching archived jobpost information.');
      setIsLoadingArchivedJobPost(false);
    }
  };
  
  const filterJobs = (job) => {
    if (!job) {
      return false;
    }
  
    //console.log("jobTypeFilters:", jobTypeFilters," - job.type:", job.employment_type);
  
    if (searchKeyword && !job.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
      return false;
    }
  
    const jobType = job.employment_type ? job.employment_type.toLowerCase() : ''; // Convert to lower case
  
    if (
      (!jobTypeFilters.fullTime && jobType === 'full-time') ||
      (!jobTypeFilters.partTime && jobType === 'part-time') ||
      (!jobTypeFilters.internship && jobType === 'internship')
    ) {
      return false;
    }
  
    if (job.salary < salaryRange[0] || job.salary > salaryRange[1]) {
      return false;
    }
  
    return true;
  };
  
  
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
    setApplyFilter(!applyFilter);
  };

  const handleSalaryRangeChange = (event, newValue) => {
    console.log("handle salary range change:",newValue);
    setSalaryRange(newValue);
    setApplyFilter(!applyFilter);
  };

  const handleJobTypeChange = (event) => {
    const { name, checked } = event.target;
    setJobTypeFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
    console.log(event.target.name,event.target.checked);
    setApplyFilter(!applyFilter);
  };

  const switchTabs = () => {
    //console.log(selectedTab);
    if (selectedTab === 0) {
      const filteredJobs = jobPostData ? jobPostData.filter(filterJobs) : [];
      setJobsToShow(filteredJobs);
      //console.log("JobPostData: ",filteredJobs);
    } else if (selectedTab === 1) {
      const filteredArchivedJobs = archivedJobPostData ? archivedJobPostData.filter(filterJobs) : [];
      setJobsToShow(filteredArchivedJobs);
      //console.log("Archived:",filteredArchivedJobs);
    }
    //console.log("JobPostData: ",jobPostData,"Archived:",archivedJobPostData);
  };
  
  useEffect(() => {
    if(fetch){
      console.log('****HERE FETCHING THE JOBLISTS********');
      const fetchData = async () => {
        try {
          await fetchJobPostData();
          await fetchArchivedJobPostData();
          console.log('1)JOBLISTS fetch: ',fetch);
          setFetch(false);
          
        } catch (error) {
          // Handle errors here
        }
      };
    
      fetchData();
    }
  }, [fetch]);
  useEffect(() => {
    updateMinMaxSalary(jobPostData);
  }, [jobPostData]);
  useEffect(() => {
    setSalaryRange([minSalary,maxSalary]);
  }, [minSalary,maxSalary]);
  useEffect(() => {
    updateMinMaxSalary(archivedJobPostData);
  }, [archivedJobPostData]);
  useEffect(() => {
    console.log('2)JOBLISTS fetch: ',fetch);
    switchTabs(); // Call switchTabs whenever jobPostData or archivedJobPostData changes
  }, [jobPostData,salaryRange,selectedTab, applyFilter]); //newly conditioned on jobpostdata, otherwise filtering wasn't happening and showed joblist wasn't updating

  if (isLoadingJobPost||isLoadingArchivedJobPost) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!jobPostData) {
    return <div>Job Post not found.</div>;
  }
  if (!archivedJobPostData) {
    return <div>Archived Job Posts not found.</div>;
  }

  return (
    <>
      <Container sx={{ marginTop: '0px'  }}>
        <Box sx={{ display: 'flex', marginBottom: '16px', alignItems: 'center' ,width:'100%' }}>
          <TextField
            label="Search by title"
            value={searchKeyword}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: '40%' }}
          />
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedInUser && (
            <Button
              component={Link}
              to={`/addJobPost/${id}`}
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
            >
              New Job Post
            </Button>
          )}

          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Tabs
              value={selectedTab}
              onChange={(event, newValue) => setSelectedTab(newValue)}
              indicatorColor="primary"
              textColor="primary"
              sx={{paddingLeft:23}}
            >
              <Tab
                  label="Job List"
                  sx={{
                    textTransform: 'none', // Prevent uppercase text
                    fontSize: '18px',
                    fontWeight: 'bold',
                    padding: '10px 20px', // Add some padding for a better look
                  }}
                />
                <Tab
                  label="Archived Job List"
                  sx={{
                    textTransform: 'none', // Prevent uppercase text
                    fontSize: '18px',
                    fontWeight: 'bold',
                    padding: '10px 20px', // Add some padding for a better look
                  }}
                />
            </Tabs>
          </Box>
        <Box sx={{ display: 'flex', height: '300px', padding: '10px'}}>
          {/* Sidebar */}
          <Paper elevation={3} sx={{ width: '500px', marginRight: '20px', padding: '16px' }}>
            <Typography variant="h6">Employment Type</Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jobTypeFilters.fullTime}
                    onChange={handleJobTypeChange}
                    name="fullTime"
                  />
                }
                label="Full-time"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jobTypeFilters.partTime}
                    onChange={handleJobTypeChange}
                    name="partTime"
                  />
                }
                label="Part-time"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jobTypeFilters.internship}
                    onChange={handleJobTypeChange}
                    name="internship"
                  />
                }
                label="Internship"
              />
            </FormGroup>
            {jobsToShow.length >= 1 && (
            <>
              <Typography variant="h6" sx={{ marginTop: '15px' }}>
                Salary Range
              </Typography>
              {minSalary === maxSalary ? (
                <Typography variant="body2">{maxSalary}</Typography>
              ) : (
                <Slider
                  value={salaryRange}
                  onChange={handleSalaryRangeChange}
                  valueLabelDisplay="auto"
                  min={minSalary}
                  max={maxSalary}
                />
              )}
            </>
            )}

            {/* <Button variant="contained" color="primary" sx={{ marginTop: '16px' }}>
              Apply Filter
            </Button> */}
          </Paper>
          {/* Job Lists */}
          <div
            style={{
              height: '700px', // Adjust the height as needed
              overflowY: 'auto',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Grid container spacing={2}>
                {jobsToShow.map((job) => (
                  <Grid item xs={12} key={job.jobpost_id}>
                    <Paper elevation={3} sx={{ padding: '16px' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        {/* <Link to={`/companyJobPosts/${id}`} style={{ textDecoration: 'none' }}>
                          <Typography variant="h6" gutterBottom>
                            {job.title}
                          </Typography>
                        </Link> */}
                        <div
                          onClick={() => {
                            setSelectedJob(job);
                          }}
                          style={{ textDecoration: 'none', cursor: 'pointer' }}
                        >
                          <Typography variant="h6" gutterBottom style={{ color: 'blue' }}>
                            {job.title}
                          </Typography>
                        </div>
                      </Box>
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

        </Box>
      </Container>
    </>
  );
};

export default JobLists;
