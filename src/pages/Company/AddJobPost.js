import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
import ClippedDrawer from '../../components/SidebarOptionsCompany';

const AddJobPost = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [vacancy, setVacancy] = useState('');
  const [salary, setSalary] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState([]);
  const [jobKeywords, setJobKeywords] = useState([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [requirementText, setRequirementText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [keywordText, setKeywordText] = useState('');

  const id = useParams().company_id;

  const [newJobPost, setNewJobPost] = useState({
    title: '',
    description: '',
    requirements: '',
    employment_type: '',
    salary: '',
    vacancy: '',
    deadline: '',
    keywords: ''
  });

  const transformedData = {
    title: jobTitle,
    description: jobDescription,
    requirements: requirementText,
    employment_type: employmentType,
    salary: salary,
    vacancy: vacancy,
    deadline: applicationDeadline,
    keywords: keywordText
  };

  const handleAddRequirement = () => {
    if (newRequirement) {
      setJobRequirements([...jobRequirements, newRequirement]);
      setNewRequirement('');
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword) {
      setJobKeywords([...jobKeywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const handlePostJob = async () => {
    const requirementText = jobRequirements.map((req, index) => `${index + 1}. ${req}`).join('\n');
    setRequirementText(requirementText);
    const keywordText = jobKeywords.map((req, index) => req.trim()).join('|');
    setKeywordText(keywordText);

    const updatedTransformedData = {
      ...transformedData, // Spread the existing properties
      requirements: requirementText, // Add or update the requirements property
      keywords: keywordText
    };
    console.log('requirementText: ', requirementText,' keywordText: ',keywordText);
    // Here you can save the job post data and navigate to "/companyVacancy"
    try {
      console.log('newJobPost: ', updatedTransformedData);
      const response = await axios.post("/api/jobpost", updatedTransformedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('response:', response);
    } catch (error) {
      console.error('Error saving newJobPost:', error);
    }
  };

  return (
    <>
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
                inputProps={{
                  type: 'number',
                  pattern: '[0-9]*', // Allow only numeric characters
                }}
                sx={{ marginBottom: '16px' }}
              />
              <Typography variant="subtitle1">Salary:</Typography>
              <TextField
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  type: 'number',
                  pattern: '[0-9]*', // Allow only numeric characters
                }}
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
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
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
              <Typography variant="subtitle1">Job Keywords:</Typography>
              <TextField
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginBottom: '8px' }}
              />
              <Button variant="outlined" onClick={handleAddKeyword}>
                Add Keyword
              </Button>
              {jobKeywords.map((req, index) => (
                <Typography key={index} variant="body2">
                  {`${index + 1}. ${req}`}
                </Typography>
              ))}
            </Box>
          </Box>
        </Paper>
        <Button
          component={Link}
          to={`/company/${id}`}
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
