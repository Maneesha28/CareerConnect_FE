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
      },
      {
        id: 'work-experience',
        label: 'Work Experience',
      },
      {
        id: 'skills',
        label: 'Skills',
      },
      {
        id: 'achievements',
        label: 'Achievements',
      },
      {
        id: 'publications',
        label: 'Publications',
      },
      {
        id: 'projects',
        label: 'Projects',
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
      fetchCurrentUser();
    }, []);

    if(!currentUser) {
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
        
        return null;
      };

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
        <Box paddingLeft={24} paddingRight={24} paddingTop={4} paddingBottom={5}>
            <PersonalInfo isLoggedInUser={currentUser.user_id == id}/>
        </Box>
        <Box paddingLeft={24} paddingRight={24} paddingTop={4} paddingBottom={5}>
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
