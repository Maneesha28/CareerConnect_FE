import Header from "../../components/Header";
import React, { useState } from 'react';
import { Box, Paper, Grid, Typography, Avatar, Button, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const sections = [
    { id: 'education', label: 'Educational Background', data: [
      { degree: 'B.Sc.', subject: 'Computer Science', institution: 'University ABC', result: '3.9/4.0', start_date: '2015', end_date: '2019' },
      { degree: 'MBA', subject: 'Business Administration', institution: 'Business School XYZ', result: '4.0/4.0', start_date: '2020', end_date: '2022' },
      // Add more educational background data items as needed
    ] },
    { id: 'work', label: 'Work Experience', data: [
      { organization: 'Company XYZ', designation: 'Software Engineer', employment_type: 'Full-time', start_date: '2020', end_date: '2022' },
      { organization: 'Tech Innovators', designation: 'Frontend Developer', employment_type: 'Contract', start_date: '2019', end_date: '2020' },
      // Add more work experience data items as needed
    ] },
    { id: 'achievements', label: 'Achievements', data: [
      { name: 'Coding Competition Winner', date: '2021-06-15', position: '1st Place', organized_by: 'CodeFest' },
      { name: 'Outstanding Performance Award', date: '2020-12-01', position: 'Top Performer', organized_by: 'TechAchieve' },
      // Add more achievement data items as needed
    ] },
    { id: 'projects', label: 'Projects', data: [
      { title: 'E-Commerce Website', description: 'Built a fully functional e-commerce website using React and Node.js.', project_link: 'https://example.com/e-commerce', technologies: 'React, Node.js, MongoDB', start_date: '2021-03-01', end_date: '2021-05-15' },
      { title: 'Portfolio Website', description: 'Developed a personal portfolio website to showcase my skills and projects.', project_link: 'https://example.com/portfolio', technologies: 'HTML, CSS, JavaScript', start_date: '2020-08-01', end_date: '2020-09-30' },
      // Add more project data items as needed
    ] },
    { id: 'publications', label: 'Publications', data: [
      { title: 'React Best Practices', authors: 'John Doe, Jane Smith', journal: 'Tech Journal', pdf_link: 'https://example.com/react-best-practices.pdf', publication_date: '2022-02-15' },
      { title: 'Web Development Trends', authors: 'Alice Johnson', journal: 'WebDev Insights', pdf_link: 'https://example.com/web-dev-trends.pdf', publication_date: '2021-09-30' },
      // Add more publication data items as needed
    ] },
    { id: 'skills', label: 'Skills', data: [
      { skill_name: 'JavaScript', expertise_level: 'Advanced' },
      { skill_name: 'React', expertise_level: 'Expert' },
      { skill_name: 'Node.js', expertise_level: 'Intermediate' },
      { skill_name: 'HTML/CSS', expertise_level: 'Advanced' },
      // Add more skill data items as needed
    ] },
  ];
  
function Profile() {
    const [activeSection, setActiveSection] = useState(sections[0].id);
  // Static data for demonstration purposes
  const profileData = {
    image: 'shadow_of_image.png',
    following: 12,
    name: 'John Doe',
    gender: 'Male',
    dateOfBirth: 'January 1, 1990',
    nationality: 'USA',
    nid: '1234567890',
    address: '1234 Elm Street, City',
    phoneNo: '123-456-7890',
    githubLink: 'https://github.com/johndoe',
    
  };

  return (
    <>
      <Header /> {/* Include your Header component */}

      {/* Main content */}
      <Box p={0}>
        <Paper elevation={3}>
          <Box p={3}>
            <Grid container spacing={3}>
              {/* Left side - Image */}
              <Grid item xs={12} md={4}>
                <Box display="flex" justifyContent="center">
                  <Avatar
                    alt="Profile Image"
                    src={profileData.image}
                    sx={{ width: 200, height: 200, boxShadow: 3 }}
                  />
                </Box>
                <Typography align="center" variant="subtitle1">
                  Following: {profileData.following}
                </Typography>
              </Grid>

              {/* Right side - Profile Info */}
              <Grid item xs={12} md={8}>
              <Box display="flex" justifyContent="flex-end">
                    <IconButton
                        color="inherit"
                        component="a" // Use the component prop to turn the IconButton into a link
                        href="/accountInfo" // Specify the link URL
                        sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }} // Style for the link appearance
                    >
                    <EditIcon />
                    <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                        Edit Info
                    </Typography>
                     </IconButton>
                </Box>
                <Typography variant="h6" gutterBottom>
                  Profile Information
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {profileData.name}
                  <br />
                  <strong>Gender:</strong> {profileData.gender}
                  <br />
                  <strong>Date of Birth:</strong> {profileData.dateOfBirth}
                  <br />
                  <strong>Nationality:</strong> {profileData.nationality}
                  <br />
                  <strong>NID:</strong> {profileData.nid}
                  <br />
                  <strong>Address:</strong> {profileData.address}
                  <br />
                  <strong>Phone No:</strong> {profileData.phoneNo}
                  <br />
                  <strong>Github Link:</strong>{' '}
                  <a href={profileData.githubLink} target="_blank" rel="noopener noreferrer">
                    {profileData.githubLink}
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>

      <Box p={0}>
        <Paper elevation={3}>
          <Box p={3}>
            <Grid container spacing={3}>
              {/* Left side - Dashboard Sections */}
              <Grid item xs={12} md={4}>
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="text"
                    onClick={() => setActiveSection(section.id)}
                    sx={{
                      width: '100%',
                      textAlign: 'left',
                      backgroundColor: section.id === activeSection ? '#f0f0f0' : 'inherit'
                    }}
                  >
                    {section.label}
                  </Button>
                ))}
              </Grid>

              {/* Right side - Section Info */}
              <Grid item xs={12} md={8}>
                {sections.map((section) => (
                  section.id === activeSection && (
                    <Box key={section.id}>
                      <Box display="flex" justifyContent="flex-end">
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {section.label}
                      </Typography>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              {Object.keys(section.data[0]).map((key) => (
                                <TableCell key={key} style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                                    {key.replace('_', ' ')}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {section.data.map((item, index) => (
                              <TableRow key={index}>
                                {Object.entries(item).map(([key, value], index) => (
                                    <TableCell key={index}>
                                        {key.includes('link') ? (
                                            <a href={value} target="_blank" rel="noopener noreferrer">
                                                {value}
                                            </a>
                                        ) : (
                                            value
                                        )}
                                    </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )
                ))}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default Profile;
