import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Header from '../../components/Header';

// Sample reviews data (replace with actual data from API)
const reviewsData = [
  {
    text: 'Great company to work for. The culture is amazing!',
    postedBy: 'John Doe',
    date: '2023-08-15',
  },
  {
    text: 'I had a wonderful experience interning at this company. Learned a lot!',
    postedBy: 'Jane Smith',
    date: '2023-08-14',
  },
  // Add more review objects here...
];

const CompanyReviews = () => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

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
      <Box sx={{ position: 'relative', marginTop: '36px' }}>
        {/* Company Banner */}
        <Link to="/companyPage" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h3" color="black" sx={{ fontWeight: 'bold', textDecoration: 'underline', border: '2px solid black', padding: '4px 8px' }}>
            Company Name
          </Typography>
        </Link>
      </Box>
      <Container sx={{ marginTop: '68px' }}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Company Reviews
          </Typography>
          {/* Display Reviews */}
          {reviewsData.map((review, index) => (
            <Paper key={index} sx={{ padding: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1" gutterBottom>
                {review.text}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2" sx={{ alignSelf: 'flex-end' }}>
                  Posted by: {review.postedBy}
                </Typography>
                <Typography variant="subtitle2">
                  {review.date}
                </Typography>
              </Box>
              <Button onClick={() => handleReviewDialogOpen(review)} color="primary" size="small">
                View Details
              </Button>
            </Paper>
          ))}
        </Paper>
      </Container>
      {/* Review Details Dialog */}
      <Dialog open={isReviewDialogOpen} onClose={handleReviewDialogClose}>
        <DialogTitle>Review Details</DialogTitle>
        <DialogContent>
          {selectedReview && (
            <>
              <DialogContentText>{selectedReview.text}</DialogContentText>
              <Typography variant="subtitle2">
                Posted by: {selectedReview.postedBy} on {selectedReview.date}
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
