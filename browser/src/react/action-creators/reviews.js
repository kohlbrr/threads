import { RECEIVE_REVIEWS, ADD_REVIEW } from '../constants';
import axios from 'axios';
import { dispatch } from  '../store';

export const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews
});

export const addReview = review => ({
  type: ADD_REVIEW,
  review
});

export const getReviews = () => (
  axios.get('/api/reviews')
  .then(res => res.data)
  .then(reviews => dispatch(receiveReviews(reviews)))
  .catch(console.error));

export const newReview = review => (
  axios.post('/api/reviews', review)
  .then(res => res.data)
  .then(addedReview => dispatch(addReview(addedReview)))
  .catch(console.error));

