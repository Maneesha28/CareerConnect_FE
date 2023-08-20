import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Header from '../../components/Header';
import PermanentDrawerLeft from '../../components/SidebarOptionsCompany';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Sample reviews data (replace with actual data from API)
const reviewsData = [
  {
    comment: 'Great company to work for. The culture is amazing!',
    postedBy: 'John Doe',
    time: '2023-08-15',
  },
  {
    comment: 'I had a wonderful experience interning at this company. Learned a lot!',
    postedBy: 'Jane Smith',
    time: '2023-08-14',
  },
  // Add more review objects here...
];

const CompanyReviews = () => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewData,setReviewData] = useState(null);
  const [companyData,setCompanyData] = useState(null);
  const [avgStars,setAvgStars] = useState(0.0);
  const [jobseekerData,setJobseekerData] = useState(null);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [isLoadingStars, setIsLoadingStars] = useState(true);
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);
  const [isLoadingJobSeeker, setIsLoadingJobSeeker] = useState(true);
  const [error, setError] = useState('');
  const id = useParams().company_id;
  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/review/all/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setReviewData(response.data);
        setIsLoadingReview(false);
      } catch (error) {
        setError('Error fetching review information.');
        setIsLoadingReview(false);
      }
    };
    const fetchCompanyData = async () => {
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
    const fetchAvgStars = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/review/avg_stars/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setAvgStars(response.data.avg_stars);
        setIsLoadingStars(false);
      } catch (error) {
        setError('Error fetching review information.');
        setIsLoadingStars(false);
      }
    };
    fetchReviewData();
    fetchAvgStars();
    fetchCompanyData();

  }, [id]);
  if (isLoadingReview||isLoadingCompany) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!reviewData) {
    return <div>Review not found.</div>;
  }
  if (!companyData) {
    return <div>Company not found.</div>;
  }

  const handleReviewDialogOpen = (review) => {
    setSelectedReview(review);
    setIsReviewDialogOpen(true);
  };

  const handleReviewDialogClose = () => {
    setSelectedReview(null);
    setIsReviewDialogOpen(false);
  };

  return (
    <>
      <Header />
      <PermanentDrawerLeft/>
      <Box sx={{ position: 'relative'}}>
        {/* Company Banner */}
        <Link to={`/company/${id}`} style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h3" color="black" sx={{ fontWeight: 'bold', textDecoration: 'underline', border: '2px solid black', padding: '4px 8px' }}>
            {companyData.company_name}
          </Typography>
        </Link>
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'right', marginTop: 20, marginRight: 600, fontWeight: 700 }}>
          Average Rating: {avgStars}
        </Typography>
      </Box>
      <Container sx={{ marginTop: '10px'}}>
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 700}}>
            Company Reviews
          </Typography>
          {/* Display Reviews */}
          {reviewData.map((review, index) => (
            <Paper key={index} sx={{ padding: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1" gutterBottom sx={{ fontSize: 28 }}>
                {review.comment}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2" sx={{ alignSelf: 'flex-end', fontSize: 22 }}>
                  {/*need jobseeker name here*/}
                  Posted by: {review.name}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontSize: 20 }}>
                  {new Date(review.time).toLocaleString()}
                </Typography>
              </Box>
              <Button onClick={() => handleReviewDialogOpen(review)} color="primary" size="large">
                View Details
              </Button>
            </Paper>
          ))}
        </Paper>
      </Container>

      {/* Review Details Dialog */}
      <Dialog open={isReviewDialogOpen} onClose={handleReviewDialogClose}>
        <DialogTitle>Review Details</DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>
          {selectedReview && (
            <>
              <DialogContentText>{selectedReview.comment}</DialogContentText>
              <Typography variant="subtitle2">
                Posted by: {selectedReview.name}
              </Typography>

              <Typography variant="subtitle2">
                {new Date(selectedReview.time).toLocaleString()}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompanyReviews;
