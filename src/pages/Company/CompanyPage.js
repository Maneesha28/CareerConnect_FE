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

  const fetchCurrentUser = async() => {
    try{
      const response = await axios.get('/api/auth/user', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        setCurrentUser(response.data);
        console.log('current user fetched');
        console.log(currentUser);
      } catch (error) {
        setError('Error fetching current user information.');

      }
    };

  useEffect(() => {
      fetchCurrentUser();

  }, [id]);
  
  return (
  <>
    <Header />
    <CompanyInfo isLoggedInUser={currentUser.user_id == id}/>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '3' }}>
        <CompanyVacancy isLoggedInUser={currentUser.user_id == id}/>
      </div>
      <div style={{ flex: '2' }}>
        <CompanyReviews isLoggedInUser={currentUser.user_id == id}/>
      </div>
    </div>
  </>
  );
};

export default CompanyPage;
