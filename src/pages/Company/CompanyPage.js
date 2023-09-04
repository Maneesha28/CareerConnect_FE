import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CompanyInfo from './CompanyInfo';
import CompanyVacancy from './CompanyVacancy';
import CompanyReviews from './CompanyReviews';

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
        console.log(currentUser.user_id,' ',id);
        console.log(currentUser.user_id === id);
        console.log(parseInt(currentUser.user_id) === parseInt(id));
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
    <>
      <Header />
      {currentUser !== null ? (
        <>
          <CompanyInfo isLoggedInUser={parseInt(currentUser.user_id) === parseInt(id)} />
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '3' }}>
              <CompanyVacancy isLoggedInUser={parseInt(currentUser.user_id) === parseInt(id)} />
            </div>
            <div style={{ flex: '2' }}>
              <CompanyReviews isLoggedInUser={parseInt(currentUser.user_id) === parseInt(id)} />
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CompanyPage;
