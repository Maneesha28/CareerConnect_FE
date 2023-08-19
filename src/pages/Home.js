import React, { useState } from 'react';
import { Container, Box, TextField, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const HoverLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const HoverText = styled(Typography)`
  text-decoration: underline;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: blue;
  }
`;
const jobPosts = [
  { id: 1, title: 'Job Title 1', company: 'Company A', employmentType: 'Full-Time' },
  { id: 2, title: 'Job Title 2', company: 'Company B', employmentType: 'Part-Time' },
  // Add more job posts here
  // ...
  { id: 3, title: 'Job Title 3', company: 'Company C', employmentType: 'Full-Time' },
  { id: 4, title: 'Job Title 4', company: 'Company D', employmentType: 'Part-Time' },
  { id: 5, title: 'Job Title 5', company: 'Company C', employmentType: 'Full-Time' },
  { id: 6, title: 'Job Title 6', company: 'Company D', employmentType: 'Part-Time' },
  { id: 7, title: 'Job Title 7', company: 'Company C', employmentType: 'Full-Time' },
  { id: 8, title: 'Job Title 8', company: 'Company D', employmentType: 'Part-Time' },
  { id: 9, title: 'Job Title 9', company: 'Company C', employmentType: 'Full-Time' },
  { id: 10, title: 'Job Title 10', company: 'Company D', employmentType: 'Part-Time' },
];

const exploreItems = [
  { path: '/exploreVacancies', label: 'Vacancies', image: '/images/vacancy2.jpg' },
  { path: '/exploreCompanies', label: 'Companies', image: '/images/location.png' },
  { path: '/exploreNewJobs', label: 'New Jobs', image: '/images/new_jobs.png' },
  { path: '/viewShortlistedJobs', label: 'Shortlisted Jobs', image: '/images/shortlist.png' },
];

const Home = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 8;

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (startIndex + itemsPerPage < jobPosts.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const visibleJobPosts = jobPosts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Header />
      <Container>
        <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
          <TextField label="Search by Keyword" variant="outlined" size="small" />
          <TextField label="Search by Company" variant="outlined" size="small" sx={{ mx: 1 }} />
          <TextField label="Job Type" variant="outlined" size="small" />
          <IconButton color="primary">
            <SearchIcon />
          </IconButton>
        </Box>

        <Typography variant="h6" component="h2" mt={3} fontWeight="bold">
          Recommended For You
        </Typography>

        <Box display="flex" alignItems="center" mt={2}>
          <IconButton color="primary" onClick={handlePrevClick}>
            <ChevronLeftIcon />
          </IconButton>
          {visibleJobPosts.map((job) => (
            <Box key={job.id} p={2} border="1px solid #ccc" m={1}>
              <HoverLink to="/viewJobPost/${job.id}">
                <HoverText variant="subtitle1" fontWeight="bold">
                    {job.title}
                </HoverText>
              </HoverLink>
              
              <Typography variant="body2">{job.company}</Typography>
              <Typography variant="body2">{job.employmentType}</Typography>
            </Box>
          ))}
          <IconButton color="primary" onClick={handleNextClick}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Typography variant="h6" component="h2" mt={3} fontWeight="bold">
          Explore
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          {exploreItems.map((item, index) => (
            <Link to={item.path} key={index} style={{ textDecoration: 'none' }}>
              <Box textAlign="center">
                <img src={item.image} alt={item.label} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                <Typography variant="subtitle1" fontWeight="bold">{item.label}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Home;
