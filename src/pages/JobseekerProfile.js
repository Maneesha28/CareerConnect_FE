import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobSeekerProfile.css';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Box, Paper, Grid, Typography, Avatar, Button, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const JobSeekerProfile = () => {
    const [jobseekerData, setJobseekerData] = useState(null);
    const [workExperienceData, setWorkExperienceData] = useState(null);
    const [educationData, setEducationData] = useState(null);
    const [skillsData, setSkillsData] = useState(null);
    const [achievementsData, setAchievementsData] = useState(null);
    const [publicationsData, setPublicationsData] = useState(null);
    const [projectData, setProjectData] = useState(null);

    const [isLoadingJobseeker, setIsLoadingJobseeker] = useState(true);
    const [isLoadingWorkExperience, setIsLoadingWorkExperience] = useState(true);
    const [isLoadingEducation, setIsLoadingEducation] = useState(true);
    const [isLoadingSkills, setIsLoadingSkills] = useState(true);
    const [isLoadingAchievements, setIsLoadingAchievements] = useState(true);
    const [isLoadingPublications, setIsLoadingPublications] = useState(true);
    const [isLoadingProject, setIsLoadingProject] = useState(true);

    const sections = [
      {
        id: 'education',
        label: 'Education Background',
        data: educationData,
      },
      {
        id: 'work-experience',
        label: 'Work Experience',
        data: workExperienceData,
      },
      {
        id: 'skills',
        label: 'Skills',
        data: skillsData,
      },
      {
        id: 'achievements',
        label: 'Achievements',
        data: achievementsData,
      },
      {
        id: 'publications',
        label: 'Publications',
        data: publicationsData,
      },
      {
        id: 'projects',
        label: 'Projects',
        data: projectData,
      }
    ];
    const [activeSection, setActiveSection] = useState(sections[0].id);
    const [error, setError] = useState('');
    const id = useParams().jobseeker_id;
  
    useEffect(() => {
      const fetchJobseekerData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/jobseeker/${id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
          setJobseekerData(response.data);
          setIsLoadingJobseeker(false);
        } catch (error) {
          setError('Error fetching jobseeker information.');
          setIsLoadingJobseeker(false);
        }
      };

      const fetchAndModifySectionData = async (endpoint, setIdFunction, setIsLoadingFunction, setErrorFunction) => {
        try {
          const response = await axios.get(endpoint, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
      
          // Modify data (e.g., remove columns containing "_id")
          const modifiedData = response.data.map(item => {
            const filteredItem = {};
            for (const key in item) {
              if (!key.includes('_id')) {
                filteredItem[key] = item[key];
              }
            }
            return filteredItem;
          });
      
          // Set state and loading status
          setIdFunction(modifiedData);
          setIsLoadingFunction(false);
        } catch (error) {
          setErrorFunction(`Error fetching information.`);
          setIsLoadingFunction(false);
        }
      };
      
      const fetchWorkExperienceData = async () => {
        const endpoint = `http://localhost:3000/api/workexperience/all/${id}`;
        fetchAndModifySectionData(endpoint, setWorkExperienceData, setIsLoadingWorkExperience, setError);
      };

    const fetchEducationData = async () => {
      const endpoint = `http://localhost:3000/api/education/all/${id}`;
      fetchAndModifySectionData(endpoint, setEducationData, setIsLoadingEducation, setError);
    };

    const fetchSkillsData = async () => {
        const endpoint = `http://localhost:3000/api/skill/all/${id}`;
        fetchAndModifySectionData(endpoint, setSkillsData, setIsLoadingSkills, setError);
    };

    const fetchAchievementsData = async () => {
        const endpoint = `http://localhost:3000/api/achievement/all/${id}`;
        fetchAndModifySectionData(endpoint, setAchievementsData, setIsLoadingAchievements, setError);
    };

    const fetchPublicationsData = async () => {
        const endpoint = `http://localhost:3000/api/publication/all/${id}`;
        fetchAndModifySectionData(endpoint, setPublicationsData, setIsLoadingPublications, setError);
    };

    const fetchProjectData = async () => {
        const endpoint = `http://localhost:3000/api/project/all/${id}`;
        fetchAndModifySectionData(endpoint, setProjectData, setIsLoadingProject, setError);
    };
  
    fetchJobseekerData();
    fetchWorkExperienceData();
    fetchEducationData();
    fetchSkillsData();
    fetchAchievementsData();
    fetchPublicationsData();
    fetchProjectData();

    }, [id]);
  
    if (isLoadingJobseeker || isLoadingWorkExperience || isLoadingEducation || isLoadingSkills || isLoadingAchievements 
        || isLoadingPublications || isLoadingProject) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    const handleTabChange = (tabName) => {
      setActiveTab(tabName);
    };
  
    if (!jobseekerData) {
      return <div>Jobseeker not found.</div>;
    }

    const handleLogout = () => {
        axios.post('http://localhost:3000/api/auth/logout', {}, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then((response) => {
            if (response.status === 200) {
                window.location.href = '/auth/login';
            }
        })
        .catch((error) => {
            console.log(error);
        });
      };
  
    return (
      <>
        <Header />
        <Box p={0}>
          <Paper elevation={3}>
            <Box p={3}>
              <Grid container spacing={3}>
                {/* Left side - Image */}
                <Grid item xs={12} md={4}>
                  <Box display="flex" justifyContent="center">
                    <Avatar
                      alt="Profile Image"
                      src={jobseekerData.image}
                      sx={{ width: 200, height: 200, boxShadow: 3 }}
                    />
                  </Box>
                  {/* <Typography align="center" variant="subtitle1">
                    Following: {jobseekerData.following}
                  </Typography> */}
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
                    <strong>Name:</strong> {jobseekerData.name}
                    <br />
                    <strong>Gender:</strong> {jobseekerData.gender}
                    <br />
                    <strong>Date of Birth:</strong> {jobseekerData.dateOfBirth}
                    <br />
                    <strong>Nationality:</strong> {jobseekerData.nationality}
                    <br />
                    <strong>NID:</strong> {jobseekerData.nid}
                    <br />
                    <strong>Address:</strong> {jobseekerData.address}
                    <br />
                    <strong>Phone No:</strong> {jobseekerData.phoneNo}
                    <br />
                    {/* <strong>Github Link:</strong>{' '}
                    <a href={jobseekerData.githubLink} target="_blank" rel="noopener noreferrer">
                      {jobseekerData.githubLink}
                    </a> */}
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
                  section.id === activeSection && section.data[0] && (
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
  };
  

export default JobSeekerProfile;
