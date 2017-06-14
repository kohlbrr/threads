import axios from 'axios';
import { ADD_REVIEW } from '../constants'
import store from '../store';

export const addReviewAction = review => ({
  type: ADD_REVIEW,
  review,
});

export const addReview = (stars, content, designId) => (
  axios.post('/api/reviews', { stars, content, designId })
  .then(res => res.data)
  .then(addedReview => store.dispatch(addReviewAction(addedReview)))
  .catch(console.error));
