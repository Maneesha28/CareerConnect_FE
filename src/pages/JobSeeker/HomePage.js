import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box,Typography } from '@mui/material';
// import { FetchProvider } from './FetchListContext';
import { FetchProvider } from '../Company/FetchContext';
import AllJobLists from './AllJobLists';
import JobPost from '../Company/JobPost';

const HomePage = () => {
  const jobseeker_id = useParams().jobseeker_id;

  const [user_id,setUserID] = useState(null);
  const [isCompany,setIsCompany] = useState(false);
  const [isJobseeker,setIsJobseeker] = useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoadingUser,setIsLoadingUser] = useState(true);
  const [error,setError] = useState(null);

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
        setIsLoggedInUser(parseInt(response.data.user_id) === parseInt(jobseeker_id));
        console.log('----------------------------------------------------------------------------');
        console.log("IsLoggedUser ? ",parseInt(response.data.user_id) === parseInt(jobseeker_id));
        setUserID(parseInt(response.data.user_id));
        setIsLoadingUser(false);
      } catch (error) {
        setError('Error fetching current user information.');
        console.log(error);
        setIsLoadingUser(false);
      }
    };

    useEffect(() => { 
        fetchCurrentUser();
    }, [jobseeker_id]);

    if(isLoadingUser){
        return <div>Loading User</div>
    }
  return (
    <FetchProvider>
    <>
      <Header />
      {currentUser !== null? (
        <>
        
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '2' }}>
              <AllJobLists user_id={user_id} isCompany={isCompany} isJobseeker={isJobseeker} isLoggedInUser={isLoggedInUser}
               selectedJob={selectedJob} setSelectedJob={setSelectedJob}
                />
            </div>
            
            <div style={{ flex: '4', marginTop: '50px' }}>
              <JobPost user_id={user_id} isCompany={isCompany} isJobseeker={isJobseeker} isLoggedInUser={isLoggedInUser}
              selectedJob={selectedJob} setSelectedJob={setSelectedJob}/>
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

export default HomePage;
