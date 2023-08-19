import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Container, Paper, TextField, IconButton, Card, CardContent, CardActions, Button } from '@mui/material';
import Header from '../../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const shortlistedJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'ABC Corp',
    employmentType: 'Full-Time',
  },
  {
    id: 2,
    title: 'UX Designer',
    company: 'XYZ Ltd',
    employmentType: 'Contract',
  },
  // Add more shortlisted job objects here
];

const ViewShortListedJobs = () => {
  const handleDelete = (id) => {
    // Your logic to delete the job from the shortlist
    console.log(`Deleted job with ID: ${id}`);
    // You can update the state or perform any other necessary actions here
  };

  const totalJobs = shortlistedJobs.length;
  const columns = 3;
  const itemsPerColumn = Math.ceil(totalJobs / columns);

  return (
    <>
      <Header />
      <Container>
        <Box textAlign="center" mt={3}>
          <Typography variant="h4" fontWeight="bold">
            Shortlisted Jobs
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
          <TextField label="Search by Keyword" variant="outlined" size="small" />
          <TextField label="Search by Company" variant="outlined" size="small" sx={{ mx: 1 }} />
          <TextField label="Job Type" variant="outlined" size="small" />
          <IconButton color="primary">
            <SearchIcon />
          </IconButton>
        </Box>

        <Box display="flex" justifyContent="space-between" flexWrap="wrap" mt={3}>
          {Array.from({ length: columns }, (_, columnIndex) => (
            <Box key={columnIndex} sx={{ width: `${100 / columns}%` }}>
              {shortlistedJobs.slice(columnIndex * itemsPerColumn, (columnIndex + 1) * itemsPerColumn).map((job) => (
                <Card key={job.id} variant="outlined" sx={{ marginBottom: '10px' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      <Link
                        to="/viewJobPost"
                        className="hover-link" // Add a class for the hover effect
                      >
                        {job.title}
                      </Link>
                    </Typography>
                    <Typography variant="subtitle1">{job.company}</Typography>
                    <Typography variant="body2">Employment Type: {job.employmentType}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default ViewShortListedJobs;
