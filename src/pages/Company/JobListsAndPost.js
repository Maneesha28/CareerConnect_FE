import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import JobLists from './JobLists';
import JobPost from './JobPost';
import { useLocation } from 'react-router-dom';
import { Box,Typography } from '@mui/material';
import { FetchProvider } from './FetchContext';
import { Link } from 'react-router-dom';

const JobListsAndPost = () => {
  const location = useLocation();
  const company_id = useParams().company_id;
  const jobpost_id = location.state?.jobpost_id;
//   console.log('company_id:', company_id);
//   console.log('jobpost_id:', jobpost_id);
  const [user_id,setUserID] = useState(null);
  const [isCompany,setIsCompany] = useState(false);
  const [isJobseeker,setIsJobseeker] = useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [companyData,setCompanyData] = useState({});
  const [fetch,setFetch] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Job List, 1 for Archived Job List
  const [isLoadingCompany,setIsLoadingCompany] = useState(true);
  const [isLoadingJobPost,setIsLoadingJobpost] = useState(true);
  const [isLoadingUser,setIsLoadingUser] = useState(true);
  const [error,setError] = useState(null);
  const fetchCompanyData = async () => {
    //console.log(1);
    try {
        //console.log(company_id);
      const response = await axios.get(`/api/company/${company_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setCompanyData(response.data);
      setIsLoadingCompany(false);
      //console.log(response.data);
    } catch (error) {
      setError('Error fetching company information.');
      setIsLoadingCompany(false);
    }
  };
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async() => {
    console.log("current user fetching----------");
    try{
      const response = await axios.get('/api/auth/user', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        setCurrentUser(response.data);
        setIsCompany(response.data.role === "company");
        setIsJobseeker(response.data.role === "jobseeker");
        setIsLoggedInUser(parseInt(response.data.user_id) === parseInt(company_id));
        console.log('----------------------------------------------------------------------------');
        console.log("IsLoggedUser ? ",parseInt(response.data.user_id) === parseInt(company_id));
        setUserID(parseInt(response.data.user_id));
        setIsLoadingUser(false);
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
            console.log("job selected in mother:",response.data);
          } catch (error) {
            setError('Error fetching company information.');
            setIsLoadingJobpost(false);
          }
    };
  useEffect(() => {
    fetchCompanyData();   
    fetchCurrentUser(); 
    fetchJobPost();
    }, [company_id]);
    useEffect(()=>{
        console.log(fetch);
        console.log(selectedJob);
    },[fetch,selectedJob]);
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
    <FetchProvider>
    <>
      <Header />
      {currentUser !== null? (
        <>
        <div style={{ display: 'flex',marginTop: '90px' }}></div>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Link to={`/company/${company_id}`} style={{ textDecoration: 'none' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            {companyData.company_name}
          </Typography>
        </Link>
      </Box>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '2' }}>
              <JobLists user_id={user_id} isCompany={isCompany} isJobseeker={isJobseeker} isLoggedInUser={isLoggedInUser}
               selectedJob={selectedJob} setSelectedJob={setSelectedJob}
               selectedTab={selectedTab} setSelectedTab={setSelectedTab}
                />
            </div>
            <div style={{ flex: '3' }}>
              <JobPost user_id={user_id} isCompany={isCompany} isJobseeker={isJobseeker} isLoggedInUser={isLoggedInUser}
              selectedJob={selectedJob} setSelectedJob={setSelectedJob}
              selectedTab={selectedTab}
              isSelectedListEmpty={false}
              />
            </div>
          </div>
        </>
              ) : (
                <p>Loading 1 2 3</p>
              )}
    </>
    </FetchProvider>
  );
};

export default JobListsAndPost;
