import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import JobLists from './JobLists';
import JobPost from './JobPost';
import { useLocation } from 'react-router-dom';
import { Box,Typography } from '@mui/material';
const JobListsAndPost = () => {
  const location = useLocation();
  const company_id = useParams().company_id;
  const jobpost_id = location.state?.jobpost_id;
  console.log('company_id:', company_id);
  console.log('jobpost_id:', jobpost_id);
  const [user_id,setUserID] = useState(null);
  const [isCompany,setIsCompany] = useState(false);
  const [isJobseeker,setIsJobseeker] = useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [companyData,setCompanyData] = useState({});
  const [fetch,setFetch] = useState(true);
  const [isLoadingCompany,setIsLoadingCompany] = useState(true);
  const [isLoadingJobPost,setIsLoadingJobpost] = useState(true);
  const [isLoadingUser,setIsLoadingUser] = useState(true);
  const [error,setError] = useState(null);
  const fetchCompanyData = async () => {
    console.log(1);
    try {
        console.log(company_id);
      const response = await axios.get(`/api/company/${company_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setCompanyData(response.data);
      setIsLoadingCompany(false);
      console.log(response.data);
    } catch (error) {
      setError('Error fetching company information.');
      setIsLoadingCompany(false);
    }
  };
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async() => {
    try{
      const response = await axios.get('/api/auth/user', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        setCurrentUser(response.data);
        setIsCompany(currentUser.role === "company");
        setIsJobseeker(currentUser.role === "jobseeker");
        setIsLoggedInUser(parseInt(currentUser.user_id) === jobpost_id)
        setUserID(parseInt(response.data.user_id));
        setIsLoadingUser(false);
        console.log(response.data);
      } catch (error) {
        setError('Error fetching current user information.');
        console.log(error);
        setIsLoadingUser(false);
      }
    };
    const fetchJobPost = async()=>{
        try {
            const response = await axios.get(`/api/jobpost/${jobpost_id}`, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            });
            setSelectedJob(response.data);
            setIsLoadingJobpost(false);
            console.log("job selected:",response.data);
          } catch (error) {
            setError('Error fetching company information.');
            setIsLoadingJobpost(false);
          }
    };
  useEffect(() => {
    console.log('here');
    fetchCompanyData();   
    fetchCurrentUser(); 
    fetchJobPost();
    }, [company_id]);
    if(isLoadingCompany){
        return <div>Loading Company.........</div>
    }
    if(isLoadingJobPost){
        return <div>Loading JobPost.......</div>
    }
    if(isLoadingUser){
        return <div>Loading User</div>
    }
  return (
    <>
      <Header />
      {currentUser !== null && selectedJob !== null? (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            {companyData.company_name}
          </Typography>
        </Box>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '3' }}>
              <JobLists user_id={user_id} isCompany={isCompany} isJobseeker={isJobseeker} isLoggedInUser={isLoggedInUser}
              fetch={fetch} selectedJob={selectedJob} setSelectedJob={setSelectedJob}
                />
            </div>
            <div style={{ flex: '2' }}>
              <JobPost user_id={user_id} isCompany={isCompany} isJobseeker={isJobseeker} isLoggedInUser={isLoggedInUser}
              fetch={fetch} setFetch={setFetch} selectedJob={selectedJob} setSelectedJob={setSelectedJob}/>
            </div>
          </div>
        </>
              ) : (
                <p>Loading 1 2 3</p>
              )}
    </>
  );
};

export default JobListsAndPost;
