import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Container, Paper, Button } from '@mui/material';
import Header from '../../components/Header';
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
const job = {
  title: 'Job Title',
  description: 'Job description text...',
  requirements: '1. Requirement 1\n2. Requirement 2',
  vacancy: '5',
  salary: '$60,000 - $80,000',
  employmentType: 'Full-Time',
  deadline: '2023-09-30',
  postedOn: '2023-08-20',
};


const company = {
  name: 'ABC Corp',
  address: '123 Main St, City, Country',
  website: 'https://www.example.com',
  email: 'contact@example.com',
};

const ViewJobPost = () => {
  const handleShortlist = () => {
    // Your logic to handle the shortlisting action
    console.log('Job shortlisted');
    // You can also update the state or perform any other actions here
  };

  return (
    <>
      <Header />
      <Container>
        <Paper elevation={3} sx={{ padding: '10px', marginTop: '20px' ,marginBottom: '20px', width: '100%' , height: '100px' }}>
          {/* Job Title and Company Name */}
          <Box textAlign="center" my={1}>
            <Typography variant="h4" fontWeight="bold">
              {job.title}
            </Typography>
            <HoverLink to="/viewCompanyPage">
              <HoverText variant="h6">
                {company.name}
              </HoverText>
            </HoverLink>
          </Box>
        </Paper>

        <Box display="flex" mt={2}>
          <Paper elevation={3} sx={{ width: '30%', padding: '20px', marginRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Sidebar */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" textDecoration="underline" mb={1}>
                Vacancy
              </Typography>
              <Typography>{job.vacancy}</Typography>
              <Typography variant="subtitle1" fontWeight="bold" textDecoration="underline" mb={1}>
                Salary
              </Typography>
              <Typography>{job.salary}</Typography>
              <Typography variant="subtitle1" fontWeight="bold" textDecoration="underline" mb={1}>
                Email
              </Typography>
              <Link to={`mailto:${company.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography sx={{ '&:hover': { color: 'blue' } }}>{company.email}</Typography>
                </Link>
              <Typography variant="subtitle1" fontWeight="bold" textDecoration="underline" mb={1}>
                Employment Type
              </Typography>
              <Typography>{job.employmentType}</Typography>
              <Typography variant="subtitle1" fontWeight="bold" textDecoration="underline" mb={1}>
                Application Deadline
              </Typography>
              <Typography>{job.deadline}</Typography>
            </Box>
            <Box>
              <Typography mb={2}>
                <Link to="/viewCompanyReviews" style={{ textDecoration: 'underline' }}>
                  See Company Reviews
                </Link>
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ width: '70%', padding: '20px' }}>
            <Box display="flex" justifyContent="flex-end">
                {/* Shortlist Button */}
              <Button variant="contained" color="primary" onClick={handleShortlist}>
                Shortlist
              </Button>
            </Box>
            {/* Job Description and Requirements */}
            <Typography variant="subtitle1" fontWeight="bold" textDecoration="underline" mb={1}>
              Job Description
            </Typography>
            <Typography>{job.description}</Typography>
            <Typography variant="subtitle1" fontWeight="bold" textDecoration="underline" mb={1} mt={2}>
              Job Requirements
            </Typography>
            <Typography>{job.requirements}</Typography>
            <Box>
                {/* Company Details */}
                <Typography variant="subtitle1" fontWeight="bold" textDecoration="underline" mb={1}>
                    Company Details
                 </Typography>
                <Typography>
                    Website: <a href={company.website}>{company.website}</a>
                </Typography>
                <Typography>Location: {company.address}</Typography>
                <Typography>Posted On: {job.postedOn}</Typography>
            </Box>
          </Paper>

        </Box>
      </Container>
    </>
  );
};

export default ViewJobPost;
