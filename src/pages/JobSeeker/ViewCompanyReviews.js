import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Rating } from '@mui/material';
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
    rating: 4, // Add rating to this review
  },
  // Add more review objects here...
];

const ViewCompanyReviews = () => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0); // New state for rating
  const [userRating, setUserRating] = useState(0);

  // ... (previous code)

  const handleRatingChange = (newValue) => {
    // Handle user's rating selection
    setUserRating(newValue);
  };
  const handleReviewDialogOpen = (review) => {
    setSelectedReview(review);
    setIsReviewDialogOpen(true);
  };

  const handleReviewDialogClose = () => {
    setSelectedReview(null);
    setIsReviewDialogOpen(false);
  };

  const handlePostReview = () => {
    // Implement your logic here to post the new review
    const currentDate = new Date().toISOString().slice(0, 10);
    const newReview = {
      text: newReviewText,
      postedBy: 'User', // You can replace this with the actual user's name
      date: currentDate,
      rating: newReviewRating, // Add the new rating to the review
    };

    // Add the new review to the reviewsData
    reviewsData.push(newReview);

    // Reset the input fields
    setNewReviewText('');
    setNewReviewRating(0);
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
            <Paper key={index} sx={{ position: 'relative', padding: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1" gutterBottom>
                {review.text}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="subtitle2">
                  Posted by: {review.postedBy}
                </Typography>
                <Typography variant="subtitle2">
                  {review.date}
                </Typography>
              </Box>
              {review.rating && (
                <Rating value={review.rating} readOnly sx={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }} />
              )}
            <Box>
            <Rating
              name="user-rating"
              value={userRating}
              onChange={(event, newValue) => handleRatingChange(newValue)}
            />
            </Box>
              <Button onClick={() => handleReviewDialogOpen(review)} color="primary" size="small">
                View Details
              </Button>
            </Paper>
          ))}
          {/* Post a Review */}
          <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Post a Review
            </Typography>
            <TextField
              label="Your Review"
              multiline
              rows={4}
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Button onClick={handlePostReview} color="success" variant="contained" sx={{ mt: 2 }}>
              Post
            </Button>
          </Paper>
        </Paper>
      </Container>
      {/* Review Details Dialog */}
      <Dialog open={isReviewDialogOpen} onClose={handleReviewDialogClose}>
        <DialogTitle>Review Details</DialogTitle>
        <DialogContent>
          {selectedReview && (
            <>
              <DialogContentText>{selectedReview.text}</DialogContentText>
              {selectedReview.rating && (
                <Rating value={selectedReview.rating} readOnly sx={{ mt: 2 }} />
              )}
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

export default ViewCompanyReviews;
