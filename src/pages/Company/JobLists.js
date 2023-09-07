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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationDialogue from '../../components/DeleteConfirmationDialogue';

const JobLists = ({user_id,isCompany,isJobseeker,isLoggedInUser,fetch,selectedJob,setSelectedJob}) => {
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Job List, 1 for Archived Job List
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

  const [editedJobPost, setEditedJobPost] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState({});
  // useEffect conditions
  //const [fetch,setFetch] = useState(fetch);
  const [applyFilter,setApplyFilter] = useState(true);

  const [newJobPost, setNewJobPost] = useState({
    title: '',
    description: '',
    requirements: '',
    vacancy: 0,
    salary: 0,
    employment_type: '',
    deadline: '',
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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
    console.log(selectedTab);
    if (selectedTab === 0) {
      const filteredJobs = jobPostData ? jobPostData.filter(filterJobs) : [];
      setJobsToShow(filteredJobs);
      console.log("JobPostData: ",filteredJobs);
    } else if (selectedTab === 1) {
      const filteredArchivedJobs = archivedJobPostData ? archivedJobPostData.filter(filterJobs) : [];
      setJobsToShow(filteredArchivedJobs);
      console.log("Archived:",filteredArchivedJobs);
    }
    console.log("JobPostData: ",jobPostData,"Archived:",archivedJobPostData);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchJobPostData();
        await fetchArchivedJobPostData();
      } catch (error) {
        // Handle errors here
      }
    };
  
    fetchData();
  }, [id, fetch]);
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
    console.log(salaryRange);
    switchTabs(); // Call switchTabs whenever jobPostData or archivedJobPostData changes
  }, [salaryRange,selectedTab, applyFilter]);

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


  const handleEditJobPost = (job) => {
    setEditedJobPost(job);
    setNewJobPost({
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      vacancy: job.vacancy,
      salary: job.salary,
      employment_type: job.employment_type,
      deadline: job.deadline,
    });
    setIsEditDialogOpen(true);
  };

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false);
    setEditedJobPost(null);
    setNewJobPost({
      title: '',
      description: '',
      requirements: '',
      vacancy: 0,
      salary: 0,
      employment_type: 'full-time',
      deadline: '',
    });
  };
  
  const handleSaveEdit = async () => {
    // Implement logic to navigate to the edit job page with the given jobId
    if (editedJobPost) {
      console.log('editedJobPost: ', newJobPost);
      console.log('jobId: ', editedJobPost.jobpost_id);
      try {
        const response = await axios.put(`/api/jobpost/${editedJobPost.jobpost_id}`, newJobPost, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        });
        console.log('response: ', response);
        //fetchJobPostData();
        setFetch(!fetch);
        setEditedJobPost(null);
        setIsEditDialogOpen(false);
        setNewJobPost({
          title: '',
          description: '',
          requirements: '',
          vacancy: 0,
          salary: 0,
          employment_type: 'full-time',
          deadline: '',
        });
      } catch (error) {
        console.error('Error updating Jobpost:', error);
      }
    }
  };
  const handleOpenDeleteConfirmation = (jobpostId) => {
    setIsDeleteConfirmationOpen({ ...isDeleteConfirmationOpen, [jobpostId]: true });
  };
  const handleDeleteJobPost = async (jobpostId) => {
    setIsDeleteConfirmationOpen({ ...isDeleteConfirmationOpen, [jobpostId]: true });
    console.log("Deleting post with id: ",jobpostId);
    try {
      const response = await axios.delete(`/api/jobpost/${jobpostId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response status: ', response.data.status);
      //fetchJobPostData();
      setFetch(!fetch);
    } catch (error) {
      console.error('Error deleting Jobpost:', error);
    }
    setIsDeleteConfirmationOpen({ ...isDeleteConfirmationOpen, [jobpostId]: false });
  };

  const handleCloseDeleteConfirmation = (jobpostId) => {
    setIsDeleteConfirmationOpen({ ...isDeleteConfirmationOpen, [jobpostId]: false });
  };

  //const filteredJobs = jobsToShow.filter(filterJobs);


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
        <Box sx={{ display: 'flex', marginBottom: '16px' }}>
          {/* Sidebar */}
          <Paper elevation={3} sx={{ width: '300px', marginRight: '16px', padding: '16px' }}>
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
            <Typography variant="h6" sx={{ marginTop: '15px' }}>
              Salary Range
            </Typography>
            <Slider
              value={salaryRange}
              onChange={handleSalaryRangeChange}
              valueLabelDisplay="auto"
              min={minSalary}
              max={maxSalary}
            />
            {/* <Button variant="contained" color="primary" sx={{ marginTop: '16px' }}>
              Apply Filter
            </Button> */}
          </Paper>
          {/* Job Lists */}
          <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            {jobsToShow.map((job) => (
              <Grid item xs={12} sm={6} md={6} key={job.jobpost_id}>
                <Paper elevation={3} sx={{ padding: '16px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    {isLoggedInUser && (
                      <div>
                        <IconButton color="primary" onClick={() => handleEditJobPost(job)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleOpenDeleteConfirmation(job.jobpost_id)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    )}
                    <DeleteConfirmationDialogue
                      isOpen={isDeleteConfirmationOpen[job.jobpost_id]}
                      onClose={() => handleCloseDeleteConfirmation(job.jobpost_id)}
                      onDelete={() => handleDeleteJobPost(job.jobpost_id)}
                    />
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
        </Box>
      </Container>

      {/* Edit Job Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Job Post</DialogTitle>
        <DialogContent>
          {/* Display existing project info */}
          {editedJobPost && (
            <Box>
              <Typography>{newJobPost.jobpost_id}</Typography>
              <TextField
                label="Title"
                fullWidth
                margin="dense"
                value={newJobPost.title}
                onChange={(e) => setNewJobPost({ ...newJobPost, title: e.target.value })}
              />
              <TextField
                label="Description"
                fullWidth
                margin="dense"
                multiline
                rows={4}
                value={newJobPost.description}
                onChange={(e) => setNewJobPost({ ...newJobPost, description: e.target.value })}
              />
              <TextField
                label="Requirements"
                fullWidth
                margin="dense"
                multiline
                rows={4}
                value={newJobPost.requirements}
                onChange={(e) => setNewJobPost({ ...newJobPost, requirements: e.target.value })}
              />
              <TextField
                select
                label="Employment Type"
                fullWidth
                margin="dense"
                value={newJobPost.employment_type}
                onChange={(e) => setNewJobPost({ ...newJobPost, employment_type: e.target.value })}
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
                value={newJobPost.vacancy}
                onChange={(e) => setNewJobPost({ ...newJobPost, vacancy: e.target.value })}
              />
              <TextField
                label="Salary"
                fullWidth
                margin="dense"
                type="number"
                value={newJobPost.salary}
                onChange={(e) => setNewJobPost({ ...newJobPost, salary: e.target.value })}
              />
              <TextField
                label="Aplication Deadline"
                fullWidth
                margin="dense"
                type="date"
                value={newJobPost.deadline}
                onChange={(e) => setNewJobPost({ ...newJobPost, deadline: e.target.value })}
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
};

export default JobLists;
