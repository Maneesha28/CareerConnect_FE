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
} from '@mui/material';
import Header from '../../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Sample job data (replace with actual data from API)
const jobData = [
  {
    id: 1,
    title: 'Software Engineer',
    type: 'Full-time',
    salary: 80000,
    vacancies: 3,
    applicants: 20,
  },
  {
    id: 2,
    title: 'Data Analyst',
    type: 'Part-time',
    salary: 60000,
    vacancies: 2,
    applicants: 15,
  },
  {
    id: 3,
    title: 'Marketing Intern',
    type: 'Internship',
    salary: 15000,
    vacancies: 1,
    applicants: 5,
  },
  // Add more job objects here...
];

const archivedJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    type: 'Part-time',
    salary: 80000,
    vacancies: 3,
    applicants: 20,
  },
  // ... archived job objects ...
];

const CompanyVacancy = () => {
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Job List, 1 for Archived Job List
  const [searchKeyword, setSearchKeyword] = useState('');
  const [jobTypeFilters, setJobTypeFilters] = useState({
    fullTime: false,
    partTime: false,
    internship: false,
  });

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

  let jobsToShow = [];
  if (selectedTab === 0) {
    jobsToShow = jobData;
  } else if (selectedTab === 1) {
    jobsToShow = archivedJobs;
  }

  const minSalary = Math.min(...jobsToShow.map(job => job.salary));
  const maxSalary = Math.max(...jobsToShow.map(job => job.salary));

  // Initialize salaryRange state with the calculated values
  const [salaryRange, setSalaryRange] = useState([minSalary, maxSalary]);
  const filteredJobs = jobsToShow.filter(filterJobs);
  useEffect(() => {
    setSalaryRange([minSalary, maxSalary]);
  }, [minSalary, maxSalary]);
  const handleSalaryRangeChange = (event, newValue) => {
    setSalaryRange(newValue);
  };
  const handleJobTypeChange = (event) => {
    setJobTypeFilters({
      ...jobTypeFilters,
      [event.target.name]: event.target.checked,
    });
  };
  const handleEditJob = (jobId) => {
    // Implement logic to navigate to the edit job page with the given jobId
  };
  
  const handleDeleteJob = (jobId) => {
    // Implement logic to delete the job post with the given jobId
  };

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
            to="/addJobPost"
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
                <Grid item xs={5} key={job.id}>
                  <Paper elevation={3} sx={{ padding: '16px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to={`/companyViewJobPost/${job.id}`} style={{ textDecoration: 'none' }}>
                      <Typography variant="h6" gutterBottom>
                        {job.title}
                      </Typography>
                    </Link>
                    <div>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Vacancy: {job.vacancies}
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
    </>
  );
};

export default CompanyVacancy;
