import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CompanyInfo from './CompanyInfo';
import CompanyVacancy from './CompanyVacancy';
import CompanyReviews from './CompanyReviews';
import { FetchProvider } from './FetchContext';

const CompanyPage = () => {
  const id = useParams().company_id;

  //for current logged in user
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchCurrentUser = async() => {
    try{
      const response = await axios.get('/api/auth/user', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        setCurrentUser(response.data);
        console.log(response.data);
        console.log('current user fetched',currentUser);
      } catch (error) {
        setError('Error fetching current user information.');
        console.log(error);
      }
    };

  useEffect(() => {
    console.log("Fetching current user...");
    fetchCurrentUser();
  }, [id]);

  return (
    <FetchProvider>
    <>
      <Header />
      {currentUser !== null ? (
        <>
        <div style={{ display: 'flex',marginTop: '70px' }}></div>
          <CompanyInfo isLoggedInUser={parseInt(currentUser.user_id) === parseInt(id)} 
            isJobseeker={currentUser.role === "jobseeker"}/>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '3' }}>
              <CompanyVacancy isLoggedInUser={parseInt(currentUser.user_id) === parseInt(id)} />
            </div>
            <div style={{ flex: '2' }}>
              <CompanyReviews isLoggedInUser={parseInt(currentUser.user_id) === parseInt(id)} 
              isJobseeker={currentUser.role === "jobseeker"}/>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
    </FetchProvider>
  );
};

export default CompanyPage;
