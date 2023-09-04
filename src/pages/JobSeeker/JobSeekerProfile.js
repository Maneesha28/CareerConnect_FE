import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { Box, Paper, Grid, Typography, Avatar, Button, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CssBaseline } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EduInfo from './Education/EduInfo';
import WorkInfo from './Work-Experience/WorkInfo';
import SkillInfo from './Skill/SkillInfo';
import AchievementInfo from './Achievement/AchievementInfo';
import PublicationInfo from './Publication/PublicationInfo';
import ProjectInfo from './Project/ProjectInfo';
import PersonalInfo from './PersonalInfo';

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
    //const idMatch = parseInt(currentUser.user_id) === parseInt(id);

    //for current logged in user
    const [currentUser, setCurrentUser] = useState(null);
    
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/api/auth/user', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setCurrentUser(response.data);
        console.log('current user fetched');
        console.log(currentUser.user_id,' ',id);
        console.log(currentUser.user_id === id);
      } catch (error) {
        console.log(error);
      }
    }; 
  
    useEffect(() => {
      const fetchJobseekerData = async () => {
        try {
          const response = await axios.get(`/api/jobseeker/${id}`, {
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
          if(response.data.status === 'Access Denied') {
            setErrorFunction(response.data.status);
            setIsLoadingFunction(false);
            return;
          }
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
        const endpoint = `/api/workexperience/all/${id}`;
        fetchAndModifySectionData(endpoint, setWorkExperienceData, setIsLoadingWorkExperience, setError);
      };

    const fetchEducationData = async () => {
      const endpoint = `/api/education/all/${id}`;
      fetchAndModifySectionData(endpoint, setEducationData, setIsLoadingEducation, setError);
    };

    const fetchSkillsData = async () => {
        const endpoint = `/api/skill/all/${id}`;
        fetchAndModifySectionData(endpoint, setSkillsData, setIsLoadingSkills, setError);
    };

    const fetchAchievementsData = async () => {
        const endpoint = `/api/achievement/all/${id}`;
        fetchAndModifySectionData(endpoint, setAchievementsData, setIsLoadingAchievements, setError);
    };

    const fetchPublicationsData = async () => {
        const endpoint = `/api/publication/all/${id}`;
        fetchAndModifySectionData(endpoint, setPublicationsData, setIsLoadingPublications, setError);
    };

    const fetchProjectData = async () => {
        const endpoint = `/api/project/all/${id}`;
        fetchAndModifySectionData(endpoint, setProjectData, setIsLoadingProject, setError);
    };
    
    fetchCurrentUser();

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

    const renderActiveSection = () => {
        const activeSectionData = sections.find(section => section.id === activeSection);
        
        if (activeSection === 'skills') {
          return <SkillInfo isLoggedInUser={currentUser.user_id == id}/>;
        }
        if (activeSection === 'education') {
            return <EduInfo isLoggedInUser={currentUser.user_id == id}/>;
        }
        if (activeSection === 'work-experience') {
            return <WorkInfo isLoggedInUser={currentUser.user_id == id}/>;
        }
        if (activeSection === 'achievements') {
            return <AchievementInfo isLoggedInUser={currentUser.user_id == id}/>;
        }
        if (activeSection === 'publications') {
            return <PublicationInfo isLoggedInUser={currentUser.user_id == id}/>;
        }
        if (activeSection === 'projects') {
            return <ProjectInfo isLoggedInUser={currentUser.user_id == id}/>;
        }
        // Render other components based on the active section
        
        return null;
      };
  
  
    if (!jobseekerData) {
      return <div>Jobseeker not found.</div>;
    }

    const defaultTheme = createTheme(
      {
        typography: {
          fontSize: 24,
        },
        palette: {
          background: {
            default: 'rgba(150, 129, 235, 0.8)',
          },
        },
      }
    );
  
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline/>
        <Header />
        <Box p={6}>
            <PersonalInfo isLoggedInUser={currentUser.user_id == id}/>
        </Box>
        <Box p={6}>
        <Paper elevation={3}>
          <Box p={0}>
            <Grid container spacing={4}>
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
                {/* Render the active section component */}
                {renderActiveSection()}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      </ThemeProvider>
    );
  };
  

export default JobSeekerProfile;
