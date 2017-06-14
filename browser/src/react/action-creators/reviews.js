import { RECEIVE_REVIEWS, ADD_REVIEW } from '../constants';
import axios from 'axios';
import store from '../store';

export const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews,
});

export const addReviewAction = review => ({
  type: ADD_REVIEW,
  review,
});

export const getReviews = () => (
  axios.get('/api/reviews')
  .then(res => res.data)
  .then(reviews => store.dispatch(receiveReviews(reviews)))
  .catch(console.error));

export const newReview = review => (
  axios.post('/api/reviews', review)
  .then(res => res.data)
  .then(addedReview => store.dispatch(addReviewAction(addedReview))))


export const addReview = (stars, content, designId) => (
  axios.post('/api/reviews', { stars, content, designId })
  .then(res => res.data)
  .then(addedReview => store.dispatch(addReviewAction(addedReview)))
  .catch(console.error));
