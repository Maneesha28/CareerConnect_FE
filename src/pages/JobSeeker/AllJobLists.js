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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../../components/Header';

const drawerWidth = 300;
// Define sample data for different job lists
const jobLists = {
  'Latest Jobs': [
    { jobpost_id: 1, title: 'Job 1', vacancy: 3, salary: '50000', employment_type: 'Full-Time' },
    { jobpost_id: 2, title: 'Job 2', vacancy: 2, salary: '60000', employment_type: 'Part-Time' },
    // Add more job data here
  ],
  'Shortlisted Jobs': [
    { jobpost_id: 3, title: 'Job 3', vacancy: 5, salary: '55000', employment_type: 'Full-Time' },
    { jobpost_id: 4, title: 'Job 4', vacancy: 1, salary: '70000', employment_type: 'Internship' },
    // Add more job data here
  ],
  'Followed Jobs': [
    { jobpost_id: 5, title: 'Job 5', vacancy: 4, salary: '65000', employment_type: 'Part-Time' },
    // Add more job data here
  ],
  'Applied Jobs': [
    { jobpost_id: 6, title: 'Job 6', vacancy: 2, salary: '75000', employment_type: 'Full-Time' },
    { jobpost_id: 7, title: 'Job 7', vacancy: 3, salary: '60000', employment_type: 'Internship' },
    // Add more job data here
  ],
};

const JobList = ({ jobs }) => (
  <Box sx={{ width: '100%' }}>
    <Grid container spacing={2}>
      {jobs.map((job) => (
        <Grid item xs={12} key={job.jobpost_id}>
          <Paper elevation={3} sx={{ padding: '16px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {job.title}
              </Typography>
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
);

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

const AllJobLists = () => {
  const [selectedList, setSelectedList] = useState('Latest Jobs');
  const [jobData, setJobData] = useState(jobLists['Latest Jobs']);
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    // Fetch data from the database based on the selected list
    if (selectedList in jobLists) {
      setJobData(jobLists[selectedList]);
    } else {
      setJobData([]);
    }
  }, [selectedList]);

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
          {Object.keys(jobLists).map((text) => (
            <ListItem
              button
              key={text}
              selected={selectedList === text}
              onClick={() => setSelectedList(text)}
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
        {selectedList === 'Latest Jobs' ? (
          <JobList jobs={jobData} />
        ) : (
          <CompanyList companies={companyData} />
        )}
      </Box>
    </Box>
  );
};

export default AllJobLists;
