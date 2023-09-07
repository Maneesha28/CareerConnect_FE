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

const steps = ['Personal Information', 'Education', 'Work Experience'];

const ResumeBuilder = () => {

  const [activeStep, setActiveStep] = useState(0);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    // Initialize other personal info fields here
  });

  const [education, setEducation] = useState({});

  const [workExperience, setWorkExperience] = useState({});

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

  useEffect(() => {
    fetchPersonalInfo();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (activeStep === 0) {
      setPersonalInfo({ ...personalInfo, [name]: value });
    } else if (activeStep === 1) {
      setEducation({ ...education, [name]: value });
    } else if (activeStep === 2) {
      setWorkExperience({ ...workExperience, [name]: value });
    }
    console.log(personalInfo);
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
          />
        );
      case 2:
        return (
          <WorkExperienceForm
            workExperience={workExperience}
            handleChange={handleChange}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  };

  return (
    <>
    <Container >
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" style={{marginBottom: '20px'}}>
          Build Your Resume
        </Typography>
        <Stepper activeStep={activeStep} >
            {steps.map((label, index) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
        <div>
        {activeStep === steps.length ? (
          <div>
            <h2>Your Resume</h2>
            {/* Display the generated resume here */}
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
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
