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
import Header from '../../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationDialogue from '../../components/DeleteConfirmationDialogue';


const CompanyVacancy = () => {
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Job List, 1 for Archived Job List
  const [searchKeyword, setSearchKeyword] = useState('');
  const [jobPostData,setJobPostData] = useState(null);
  const [archivedJobPostData,setArchivedJobPostData] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(Infinity);
  const [salaryRange, setSalaryRange] = useState([minSalary, maxSalary]);
  const [jobTypeFilters, setJobTypeFilters] = useState({
    fullTime: false,
    partTime: false,
    internship: false,
  });
  const [isLoadingJobPost, setIsLoadingJobPost] = useState(true);
  const [isLoadingArchivedJobPost, setIsLoadingArchivedJobPost] = useState(true);
  const [error, setError] = useState('');
  const id = useParams().company_id;
  let jobsToShow = [];

  const [editedJobPost, setEditedJobPost] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
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

  const fetchJobPostData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/jobpost/all/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const jobData = response.data;
      const min = Math.min(...jobData.map(job => job.salary));
      const max = Math.max(...jobData.map(job => job.salary));

      setJobPostData(jobData);
      setMinSalary(min);
      setMaxSalary(max);
      setSalaryRange([min, max]);
      setIsLoadingJobPost(false);
    } catch (error) {
      setError('Error fetching jobpost information.');
      setIsLoadingJobPost(false);
    }
  };
  const fetchArchivedJobPostData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/jobpost/archived/${id}`, {
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

  useEffect(() => {
    fetchJobPostData();
    fetchArchivedJobPostData();
    //setFilteredJobs(jobsToShow.jobsToShow.filter(filterJobs));

  }, [id]);
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


  const filterJobs = (job) => {
    if (searchKeyword && !job.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
      return false;
    }
    if (
      (!jobTypeFilters.fullTime && job.type === 'Full-time') ||
      (!jobTypeFilters.partTime && job.type === 'Part-time') ||
      (!jobTypeFilters.internship && job.type === 'Internship')
    ) {
      return false;
    }
    if (job.salary < salaryRange[0] || job.salary > salaryRange[1]) {
      return false;
    }
    return true;
  };

  const handleSalaryRangeChange = (event, newValue) => {
    setSalaryRange(newValue);
  };

  const handleJobTypeChange = (event) => {
    const { name, checked } = event.target;
    setJobTypeFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
    console.log(event.target.name,event.target.checked);
    
    // Update the filtered jobs based on the new filters
    const updatedFilteredJobs = jobsToShow.filter(filterJobs);
    setFilteredJobs(updatedFilteredJobs);
  };

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
        const response = await axios.put(`http://localhost:3001/api/jobpost/${editedJobPost.jobpost_id}`, newJobPost, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        console.log('response: ', response);
        fetchJobPostData();
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
  
  const handleDeleteJobPost = async (jobpostId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/jobpost/${jobpostId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response status: ', response.data.status);
      fetchJobPostData();
    } catch (error) {
      console.error('Error deleting Jobpost:', error);
    }
    setIsDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false); // Close the confirmation dialog
  };

  if (selectedTab === 0) {
    jobsToShow = jobPostData;
  } else if (selectedTab === 1) {
    jobsToShow = archivedJobPostData;
  }

  //const filteredJobs = jobsToShow.filter(filterJobs);


  return (
    <>
      <Header />
      <Container sx={{ marginTop: '36px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          <Typography variant="h4">Job Lists</Typography>
        </Box>
        <Box sx={{ display: 'flex', marginBottom: '16px', alignItems: 'center' }}>
          <TextField
            label="Search by title"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
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
          <Box sx={{ flexGrow: 1 }} />
          <Button
            component={Link}
            to={`/addJobPost/${id}`}
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
          >
            New Job Post
          </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            <Button variant="contained" color="primary" sx={{ marginTop: '16px' }}>
              Apply Filter
            </Button>
          </Paper>
          {/* Job Lists */}
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {filteredJobs.map((job) => (
                <Grid item xs={5} key={job.jobpost_id}>
                  <Paper elevation={3} sx={{ padding: '16px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to={`/companyViewJobPost/${job.jobpost_id}`} style={{ textDecoration: 'none' }}>
                      <Typography variant="h6" gutterBottom>
                        {job.title}
                      </Typography>
                    </Link>
                    <div>
                      <IconButton color="primary" onClick={() => handleEditJobPost(job)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => setIsDeleteConfirmationOpen(true)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                    <DeleteConfirmationDialogue
                    isOpen={isDeleteConfirmationOpen}
                    onClose={handleCancelDelete}
                    onDelete={() => handleDeleteJobPost(job.jobpost_id)}
                  />
                  </Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Vacancy: {job.vacancy}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Applicants: {job.applicants}
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

export default CompanyVacancy;
