// ResumeBuilder.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import WorkExperienceForm from './WorkExperienceForm';
import AchievementForm from './AchievementForm';
import ProjectForm from './ProjectForm';
import PublicationForm from './PublicationForm';
import SkillForm from './SkillForm';
import Header from '../Header';
import generatePDF from './generatePDF';

const steps = ['Personal Information', 'Educational Background', 'Work Experience', 'Achievements', 'Skills',
'Projects', 'Publications' ];

const ResumeBuilder = () => {

  const [activeStep, setActiveStep] = useState(0);

  const [personalInfo, setPersonalInfo] = useState({});
  const [education, setEducation] = useState({});
  const [workExperience, setWorkExperience] = useState({});
  const [achievements, setAchievements] = useState({});
  const [skills, setSkills] = useState({});
  const [projects, setProjects] = useState({});
  const [publications, setPublications] = useState({});
  const [error, setError] = useState('');
  const [index, setIndex] = useState(0);

  const [selectedEducation, setSelectedEducation] = useState([]);
  const [selectedWorkExperience, setSelectedWorkExperience] = useState([]);
  const [selectedAchievements, setSelectedAchievements] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedPublications, setSelectedPublications] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const id = useParams().jobseeker_id;

  const fetchPersonalInfo = async () => {
    try {
        const response = await axios.get(`/api/jobseeker/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if(response.data.status === 'not a jobseeker')
      {
        setError('Not a jobseeker');
        return;
      }
      setPersonalInfo(response.data);
    } catch (error) {
      setError('Error fetching jobseeker information.');

    }
  };

  const fetchEducationInfo = async () => {
    const endpoint = `/api/education/all/${id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      // Modify data (e.g., remove columns containing "_id")
      if(response.data.status === 'Access Denied') {
        setError(response.data.status);
        return;
      }
      setEducation(response.data);
    } catch (error) {
      setError(`Error fetching information.`);
    }
  };

  const fetchWorkExperienceInfo = async () => {
    const endpoint = `/api/workexperience/all/${id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      // Modify data (e.g., remove columns containing "_id")
      if(response.data.status === 'Access Denied') {
        setError(response.data.status);
        return;
      }
      setWorkExperience(response.data);
    } catch (error) {
      setError(`Error fetching information.`);
    }
  };

  const fetchProjectInfo = async () => {
    const endpoint = `/api/project/all/${id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      // Modify data (e.g., remove columns containing "_id")
      if(response.data.status === 'Access Denied') {
        setError(response.data.status);
        return;
      }
      setProjects(response.data);
    } catch (error) {
      setError(`Error fetching information.`);
    }
  };

  const fetchAchievementInfo = async () => {
    const endpoint = `/api/achievement/all/${id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      // Modify data (e.g., remove columns containing "_id")
      if(response.data.status === 'Access Denied') {
        setError(response.data.status);
        return;
      }
      setAchievements(response.data);
    } catch (error) {
      setError(`Error fetching information.`);
    }
  };

  const fetchSkillInfo = async () => {
    const endpoint = `/api/skill/all/${id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      // Modify data (e.g., remove columns containing "_id")
      if(response.data.status === 'Access Denied') {
        setError(response.data.status);
        return;
      }
      setSkills(response.data);
    } catch (error) {
      setError(`Error fetching information.`);
    }
  };

  const fetchPublicationInfo = async () => {
    const endpoint = `/api/publication/all/${id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      // Modify data (e.g., remove columns containing "_id")
      if(response.data.status === 'Access Denied') {
        setError(response.data.status);
        return;
      }
      setPublications(response.data);
    } catch (error) {
      setError(`Error fetching information.`);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
    fetchEducationInfo();
    fetchWorkExperienceInfo();
    fetchProjectInfo();
    fetchAchievementInfo();
    fetchSkillInfo();
    fetchPublicationInfo();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (activeStep === 0) {
      setPersonalInfo({ ...personalInfo, [name]: value });
    } else if (activeStep === 1) {
      setEducation({ ...education, [name]: value });
    } else if (activeStep === 2) {
      setWorkExperience({ ...workExperience, [name]: value });
    } else if (activeStep === 3) {
      setAchievements({ ...achievements, [name]: value });
    } else if (activeStep === 4) {
      setSkills({...skills, [name]: value });
    } else if (activeStep === 5) {
      setProjects({ ...projects, [name]: value });
    } else if (activeStep === 6) {
      setPublications({...achievements, [name]: value });
    }
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <PersonalInfoForm
            personalInfo={personalInfo}
            handleChange={handleChange}
          />
        );
      case 1:
        return (
          <EducationForm
            education={education}
            handleChange={handleChange}
            setSelectedEducation={setSelectedEducation}
          />
        );
      case 2:
        return (
          <WorkExperienceForm
            workExperience={workExperience}
            handleChange={handleChange}
            setSelectedWorkExperience={setSelectedWorkExperience}
          />
        );
      case 3:
        return (
          <AchievementForm
            achievements={achievements}
            handleChange={handleChange}
            setSelectedAchievements={setSelectedAchievements}
          />
        );
      case 4:
        return (
          <SkillForm
            skills={skills}
            handleChange={handleChange}
            setSelectedSkills={setSelectedSkills}
          />
        );
      case 5:
        return (
          <ProjectForm
            projects={projects}
            handleChange={handleChange}
            setSelectedProjects={setSelectedProjects}
          />
        );
      case 6:
        return (
          <PublicationForm
            publications={publications}
            handleChange={handleChange}
            setSelectedPublications={setSelectedPublications}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  };

  return (
    <>
    <Header/>
    <Container maxWidth='fixed' style={{ marginTop: 150}}>
      <Paper elevation={3} style={{ padding: '20px'}}>
        <Typography variant="h4" style={{marginBottom: '20px', textAlign: 'center', fontWeight: 'bold'}}>
          Build Your Resume
        </Typography>
        <Stepper activeStep={activeStep} style={{marginBottom: '40px'}}>
            {steps.map((label, index) => (
            <Step key={label}>
                <StepLabel><Typography variant='h5'>{label}</Typography></StepLabel>
            </Step>
            ))}
        </Stepper>
        <div>
        {activeStep === steps.length ? (
          generatePDF(personalInfo, selectedEducation, selectedWorkExperience, selectedAchievements, selectedSkills, selectedProjects, selectedPublications)
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button disabled={activeStep === 0} variant="contained" color="secondary" onClick={handleBack} style={{ marginRight: '10px' }}>
                Back
              </Button>
              <Button variant="contained" color="secondary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
      </Paper>
    </Container>
    </>
  );
};

export default ResumeBuilder;
