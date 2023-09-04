import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

const CompanyReviews = ({isLoggedInUser}) => {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewData,setReviewData] = useState(null);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [error, setError] = useState('');
  const id = useParams().company_id;
  //for current logged in user
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingUser,setIsLoadingUser] = useState(true);
  const [isAddReviewDialogOpen, setIsAddReviewDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Function to open the review dialog
  const handleAddReviewDialogOpen = () => {
    setIsAddReviewDialogOpen(true);
  };
  // Function to close the review dialog
    const handleAddReviewDialogClose = () => {
      setIsAddReviewDialogOpen(false);
    };
    // Function to handle posting a review
  const handlePostReview = async () => {
    try {
      const response = await axios.post('/api/review', {
        company_id: id,
        comment: comment,
        stars: rating,
      });

      // Handle success, e.g., clear form fields and close the dialog
      setRating(0);
      setComment('');
      setIsAddReviewDialogOpen(false);
    } catch (error) {
      // Handle error
    }
  };
  // State for editing a review
  const [isEditReviewDialogOpen, setIsEditReviewDialogOpen] = useState(false);
  const [editedRating, setEditedRating] = useState(0);
  const [editedComment, setEditedComment] = useState('');

  // Function to open the edit review dialog
  const handleEditReview = (review) => {
    setEditedRating(review.stars);
    setEditedComment(review.comment);
    setIsEditReviewDialogOpen(true);
  };

  // Function to close the edit review dialog
  const handleEditReviewDialogClose = () => {
    setIsEditReviewDialogOpen(false);
  };

  // Function to handle updating a review
  const handleUpdateReview = async (review) => {
    try {
      const response = await axios.put(`/api/review/${review.review_id}`, {
        comment: editedComment,
        stars: editedRating,
      });

      // Handle success, e.g., clear form fields and close the dialog
      setEditedRating(0);
      setEditedComment('');
      setIsEditReviewDialogOpen(false);
    } catch (error) {
      // Handle error
    }
  };
  const handleDeleteReview = async (reviewId) => {
    try {
      // Send a DELETE request to delete the review by its ID
      await axios.delete(`/api/review/${reviewId}`);

      // Handle success, e.g., remove the deleted review from the state
      const updatedReviewData = reviewData.filter((review) => review.review_id !== reviewId);
      setReviewData(updatedReviewData);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  const fetchCurrentUser = async() => {
    try{
      const response = await axios.get('/api/auth/user', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
        setCurrentUser(response.data);
        setIsLoadingUser(false);
      } catch (error) {
        setError('Error fetching current user information.');
        console.log(error);
        setIsLoadingUser(false);
      }
    };
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(`/api/review/all/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setReviewData(response.data);
        setIsLoadingReview(false);
      } catch (error) {
        setError('Error fetching Review information.');
        setIsLoadingReview(false);
      }
    };
  useEffect(() => {

    fetchReviewData();
    fetchCurrentUser();
  }, [id]);
  if (isLoadingReview||isLoadingUser) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!reviewData) {
    return <div>Review not found.</div>;
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
      <Container sx={{ marginTop: '0px', width: '100%' }}>
        <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Reviews
        </Typography>
        {!isLoggedInUser && (
          <Button
            variant="contained"
            color="success"
            onClick={handleAddReviewDialogOpen} // Define this function to open the review dialog
          >
            Add Review +
          </Button>
        )}
      </div>
          {/* Display Reviews */}
          {reviewData.map((review, index) => (
            <Paper key={index} sx={{ padding: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
              {currentUser && currentUser.user_id === review.jobseeker_id && (
                <div>
                  {/* Edit icon/button */}
                  <IconButton color="primary" onClick={() => handleEditReview(review)}>
                    <EditIcon />
                  </IconButton>
                  
                  {/* Delete icon/button */}
                  <IconButton color="error" onClick={() => handleDeleteReview(review.review_id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
              <Typography variant="body1" gutterBottom sx={{ fontSize: 28 }}>
                {review.comment}
              </Typography>
              <Typography component="legend">Read only</Typography>
              <Rating name="read-only" value={review.stars} readOnly />
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
      <Dialog open={isReviewDialogOpen} onClose={handleReviewDialogClose} fullWidth maxWidth="md">
  <DialogTitle>Review Details</DialogTitle>
  <DialogContent sx={{ padding: '20px' }}>
    {selectedReview && (
      <>
        <DialogContentText>{selectedReview.comment}</DialogContentText>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Typography variant="subtitle2" style={{ marginRight: '10px' }}>
                Posted by: {selectedReview.name}
              </Typography>
              <Rating
                name="read-only"
                value={selectedReview.stars}
                readOnly
              />
          </div>
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
      <Dialog open={isAddReviewDialogOpen} onClose={handleAddReviewDialogClose}>
        <DialogTitle>Please give a rating</DialogTitle>
        <Rating
          name="controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label="Review"
          multiline
          rows={4}
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <DialogActions>
          <Button onClick={handleAddReviewDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePostReview} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompanyReviews;
