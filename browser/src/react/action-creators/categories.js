import axios from 'axios';
import { RECEIVE_CATEGORIES, RECEIVE_CATEGORY, SET_CATEGORY } from '../constants';


export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const receiveCategory = category => ({
  type: RECEIVE_CATEGORY,
  category,
});

export const setCategory = category => ({
  type: SET_CATEGORY,
  category,
});


export const fetchCatgories = () => dispatch =>
  axios.get('/api/categories')
  .then(res => res.data)
  .then(categories => dispatch(receiveCategories(categories)))
  .catch(console.error);


export const addCategory = category => dispatch =>
  axios.post('/api/categories', category)
  .then(res => res.data)
  .then(addedDesign => dispatch(receiveCategory(addedDesign)))
  .catch(console.error);
