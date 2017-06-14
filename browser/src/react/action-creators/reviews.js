import { ADD_REVIEW } from '../constants';
import axios from 'axios';
import { dispatch } from  '../store';


export const addReview = review => (
  axios.post('/api/reviews', review)
  .then(res => res.data)
  .then(addedReview => (dispatch(addedReview)))
  .catch(console.error));

