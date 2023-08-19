import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import Header from '../../components/Header';

// Sample company data (replace with actual data from API)
const companyData = {
  company_name: 'ABC Corp',
  description: 'A leading technology company',
  address: '123 Main St, City, Country',
  trade_license: '123456789',
  website_address: 'https://www.example.com',
  phone_no: '123-456-7890',
  company_logo: '', // Replace with actual logo image path
};

const defaultCompanyLogo = '../images/defaultCompanyLogo.jpg'; // Replace with default logo image path


const ViewCompanyPage = () => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const handleContactDialogOpen = () => {
    setIsContactDialogOpen(true);
  };

  const handleContactDialogClose = () => {
    setIsContactDialogOpen(false);
  };

  const handleFollowButtonClick = () => {
    // Customize this function with the action you want for the Follow+ button
    console.log('Follow+ button clicked');
    // For example, you can implement a follow functionality here
    // and update the UI accordingly.
  };

  const exploreItems = [
    { path: '/viewCompanyVacancies', label: 'Vacancies', image: '/images/vacancy.jpg' },
    { path: companyData.website_address, label: 'Website', image: '/images/website.jpg' },
    { path: '/viewCompanyReviews', label: 'Reviews', image: '/images/review.jpg' },
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
        <Link to="/companyPage" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h2" color="black" sx={{ fontWeight: 'bold', textDecoration: 'underline', border: '2px solid black', padding: '4px 8px' }}>
            {companyData.company_name}
          </Typography>
        </Link>
        {/* Add Follow+ Button */}
        <Box
          sx={{
            position: 'absolute',
            top: '60%', // Adjust the vertical position as needed
            right: '50%', // Adjust the horizontal position as needed
            backgroundColor: 'green',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleFollowButtonClick} // Add the onClick action
        >
          Follow+
        </Box>
        
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
                <Link to={item.path} style={{ textDecoration: 'none' }}>
                  <Box textAlign="center">
                    <img src={item.image} alt={item.label} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    <Typography variant="subtitle1" fontWeight="bold">{item.label}</Typography>
                  </Box>
                </Link>
              ) : (
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
            Email: company@example.com
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

export default ViewCompanyPage;
