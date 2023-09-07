import React, { useState, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Container,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';
import PersonalInfo from '../../pages/JobSeeker/PersonalInfo';
import PersonalInfoForm from './PersonalInfoForm';
import { fontSize } from '@mui/system';

function FormStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showEducationInfo, setShowEducationInfo] = useState(true);
  const [showWorkExperience, setShowWorkExperience] = useState(true);
  const [personalInfo, setPersonalInfo] = useState({});
  const [educationInfo, setEducationInfo] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [selectedWorkExperience, setSelectedWorkExperience] = useState([]);

  useEffect(() => {
    // Fetch personal information if selected
    if (showPersonalInfo) {
      axios.get('/api/jobseeker/2').then((response) => {
        setPersonalInfo(response.data);
      });
    }
  }, [showPersonalInfo]);

  useEffect(() => {
    // Fetch education information if selected
    if (showEducationInfo) {
      axios.get('/api/education/all/2').then((response) => {
        setEducationInfo(response.data);
        // Initialize selectedEducation state with all false values
        setSelectedEducation(new Array(response.data.length).fill(false));
      });
    }
  }, [showEducationInfo]);

  useEffect(() => {
    // Fetch work experience if selected
    if (showWorkExperience) {
      axios.get('/api/workexperience/all/2').then((response) => {
        setWorkExperience(response.data);
        // Initialize selectedWorkExperience state with all false values
        setSelectedWorkExperience(new Array(response.data.length).fill(false));
      });
    }
  }, [showWorkExperience]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Create arrays to store selected education and work experience
    const selectedEducationData = educationInfo.filter(
      (_, index) => selectedEducation[index]
    );
    const selectedWorkExperienceData = workExperience.filter(
      (_, index) => selectedWorkExperience[index]
    );

    // Handle form submission here with selected data
    console.log('Selected Data:', {
      personalInfo,
      selectedEducation: selectedEducationData,
      selectedWorkExperience: selectedWorkExperienceData,
    });
  };

  const steps = ['Personal Information', 'Educational Background', 'Work Experience', 'Achievements', 'Projects', 'Skills', 'Publications'];

  const getStepContent = (step) => {
    switch (step) {
      case 0: // Personal Information
        return (<PersonalInfoForm showPersonalInfo={showPersonalInfo} setShowPersonalInfo={setShowPersonalInfo} personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} handlePersonalInfoChange={setPersonalInfo} />);
      case 1: // Educational Background
        return (
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showEducationInfo}
                  onChange={(e) => setShowEducationInfo(e.target.checked)}
                />
              }
              label="Show Education Information"
            />
            {showEducationInfo && (
              <div>
                {educationInfo.map((education, index) => (
                  <div key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedEducation[index]}
                          onChange={(e) =>
                            setSelectedEducation((prev) =>
                              prev.map((value, i) =>
                                i === index ? e.target.checked : value
                              )
                            )
                          }
                        />
                      }
                      label={`Education #${index + 1}`}
                    />
                    {selectedEducation[index] && (
                      <div>
                        <TextField
                          label="School"
                          value={education.school}
                          fullWidth
                          readOnly
                        />
                        <TextField
                          label="Degree"
                          value={education.degree}
                          fullWidth
                          readOnly
                        />
                        <TextField
                          label="Graduation Year"
                          value={education.graduationYear}
                          fullWidth
                          readOnly
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 2: // Work Experience
        return (
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showWorkExperience}
                  onChange={(e) => setShowWorkExperience(e.target.checked)}
                />
              }
              label="Show Work Experience"
            />
            {showWorkExperience && (
              <div>
                {workExperience.map((experience, index) => (
                  <div key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedWorkExperience[index]}
                          onChange={(e) =>
                            setSelectedWorkExperience((prev) =>
                              prev.map((value, i) =>
                                i === index ? e.target.checked : value
                              )
                            )
                          }
                        />
                      }
                      label={`Work Experience #${index + 1}`}
                    />
                    {selectedWorkExperience[index] && (
                      <div>
                        <TextField
                          label="Job Title"
                          value={experience.jobTitle}
                          fullWidth
                          readOnly
                        />
                        <TextField
                          label="Company"
                          value={experience.company}
                          fullWidth
                          readOnly
                        />
                        <TextField
                          label="Start Date"
                          value={experience.startDate}
                          fullWidth
                          readOnly
                        />
                        <TextField
                          label="End Date"
                          value={experience.endDate}
                          fullWidth
                          readOnly
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      // case 3: // Achievements
      //   return ();
      // case 4: // Projects
      //   return ();
      // case 5: // Skills
      //   return ();
      // case 6: // Publications
      //   return ();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" style={{marginBottom: '20px'}}>
          Build Your Resume
        </Typography>
        <Stepper activeStep={activeStep} style={{marginBottom: '20px'}}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography variant="h6">Profile Created Successfully!</Typography>
              <Button onClick={() => setActiveStep(0)}>Create Another</Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div style={{ marginTop: '20px' }}>
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
  );
}

export default FormStepper;
