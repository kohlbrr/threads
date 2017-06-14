import axios from 'axios';
import { SET_CURRENT_DESIGN, ADD_REVIEW } from '../constants';
import store from '../store'

export const setCurrentDesign = design => ({
  type: SET_CURRENT_DESIGN,
  design,
});

export const fetchDesign = id => dispatch =>
  axios.get(`/api/designs/${id}`)
  .then(res => res.data)
  .then(design => dispatch(setCurrentDesign(design)))
  .catch(console.error);


export const addReviewToDesign = (review) => ({
  type: ADD_REVIEW,
  review,
});

export const addReview = (content, stars, id) => dispatch =>
  axios.post(`/api/designs/${id}/reviews`, { content, stars })
  .then(res => res.data)
  .then((review) => {
    review.user = store.getState().currentUser
    dispatch(addReviewToDesign(review));
  });
