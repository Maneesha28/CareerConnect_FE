import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const defaultCompanyLogo = '../images/defaultCompanyLogo.jpg'; // Replace with default logo image path


const CompanyPage = () => {
  const [companyData, setCompanyData] = useState(null);
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [error, setError] = useState('');
  const id = useParams().company_id;
  useEffect(() => {
    const fetchCompanyData = async () => {
      console.log(id);
      try {
        const response = await axios.get(`http://localhost:3001/api/company/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setCompanyData(response.data);
        setIsLoadingCompany(false);
      } catch (error) {
        setError('Error fetching company information.');
        setIsLoadingCompany(false);
      }
    };
    fetchCompanyData();

  }, [id]);
  if (isLoadingCompany) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!companyData) {
    return <div>Company not found.</div>;
  }

  const handleContactDialogOpen = () => {
    setIsContactDialogOpen(true);
  };

  const handleContactDialogClose = () => {
    setIsContactDialogOpen(false);
  };

  const exploreItems = [
    { path: `/companyVacancy/${id}`, label: 'Vacancies', image: '/images/vacancy.jpg' },
    { path: companyData.website_address, label: 'Website', image: '/images/website.jpg' },
    { path: `/companyReviews/${id}`, label: 'Reviews', image: '/images/review.jpg' },
    { action: handleContactDialogOpen, label: 'Contact Company', image: '/images/contact.png' },
  ];

  return (
    <>
      <Header />
      <Box sx={{ position: 'relative' }}>
        <img
          src={companyData.company_logo || defaultCompanyLogo}
          alt="Company Logo"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            maxHeight: '200px', // Adjust the maxHeight to make the banner smaller
          }}
        />
        <Link to={`/company/${id}`} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h2" color="black" sx={{ fontWeight: 'bold', textDecoration: 'underline', border: '2px solid black', padding: '4px 8px' }}>
            {companyData.company_name}
          </Typography>
        </Link>
      </Box>
      <Container sx={{ marginTop: '30px' }}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Company Description
          </Typography>
          <Typography>{companyData.description}</Typography>
        </Paper>
        <Typography variant="h6" component="h2" mt={3} fontWeight="bold">
          Explore
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          {exploreItems.map((item, index) => (
            <Grid item xs={3} key={index}>
            {item.path ? (
                item.label === 'Website' ? (
                <Box textAlign="center">
                  <a href={`http://${item.path}`} target="_blank" rel="noopener noreferrer">
                    <img src={item.image} alt={item.label} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    <Typography variant="subtitle1" fontWeight="bold">{item.label}</Typography>
                  </a>
                </Box>
                ) : (
                <Link to={item.path} style={{ textDecoration: 'none' }}>
                  <Box textAlign="center">
                    <img src={item.image} alt={item.label} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    <Typography variant="subtitle1" fontWeight="bold">{item.label}</Typography>
                  </Box>
                </Link>
              )) : (
                <button onClick={item.action} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
                  <img src={item.image} alt={item.label} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                </button>
              )}
            </Grid>
          ))}
        </Box>
      </Container>
      <Dialog open={isContactDialogOpen} onClose={handleContactDialogClose}>
        <DialogTitle>Contact Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Address: {companyData.address}
            <br />
            {}
            Email: {companyData.email}
            <br />
            Phone No: {companyData.phone_no}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContactDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompanyPage;
