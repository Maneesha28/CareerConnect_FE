import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import Header from '../../components/Header';

const AddJobPost = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [vacancy, setVacancy] = useState('');
  const [salary, setSalary] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [requirementText, setRequirementText] = useState('');

  const handleAddRequirement = () => {
    if (newRequirement) {
      setJobRequirements([...jobRequirements, newRequirement]);
      setNewRequirement('');
    }
  };

  const handlePostJob = () => {
    const requirementText = jobRequirements.map((req, index) => `${index + 1}. ${req}`).join('\n');
    setRequirementText(requirementText);
    // Here you can save the job post data and navigate to "/companyVacancy"
  };

  return (
    <>
      <Header />
      <Container sx={{ marginTop: '36px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <Typography variant="h6">Job Title:</Typography>
          <TextField
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ marginLeft: '8px' }}
          />
        </Box>
        <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '30%', marginRight: '16px' }}>
              <Typography variant="subtitle1">Vacancy:</Typography>
              <TextField
                value={vacancy}
                onChange={(e) => setVacancy(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: '16px' }}
              />
              <Typography variant="subtitle1">Salary:</Typography>
              <TextField
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: '16px' }}
              />
              <Typography variant="subtitle1">Application Deadline:</Typography>
              <TextField
                type="date"
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Employment Type:</Typography>
              <FormControl variant="outlined" size="small" fullWidth sx={{ marginBottom: '16px' }}>
                <InputLabel>Employment Type</InputLabel>
                <Select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  label="Employment Type"
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="subtitle1">Job Description:</Typography>
              <TextField
                multiline
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                rows={4}
                sx={{ marginBottom: '16px' }}
              />
              <Typography variant="subtitle1">Job Requirements:</Typography>
              <TextField
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: '8px' }}
              />
              <Button variant="outlined" onClick={handleAddRequirement}>
                Add Requirement
              </Button>
              {jobRequirements.map((req, index) => (
                <Typography key={index} variant="body2">
                  {`${index + 1}. ${req}`}
                </Typography>
              ))}
            </Box>
          </Box>
        </Paper>
        <Button
          component={Link}
          to="/companyVacancy"
          variant="contained"
          color="success"
          sx={{ float: 'right' }}
          onClick={handlePostJob}
        >
          Post
        </Button>
      </Container>
    </>
  );
};

export default AddJobPost;
