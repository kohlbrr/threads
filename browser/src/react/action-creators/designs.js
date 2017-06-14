import axios from 'axios';
import { RECEIVE_DESIGNS, RECEIVE_DESIGN, SET_CURRENT_DESIGN, ADD_REVIEW } from '../constants';


export const receiveDesigns = designs => ({
  type: RECEIVE_DESIGNS,
  designs,
});

export const receiveDesign = design => ({
  type: RECEIVE_DESIGN,
  design,
});

export const setDesign = design => ({
  type: SET_CURRENT_DESIGN,
  design,
});

export const fetchDesigns = () => dispatch =>
  axios.get('/api/designs')
  .then(res => res.data)
  .then(designs => dispatch(receiveDesigns(designs)))
  .catch(console.error);


export const addDesign = (name, sex, price, imageUrl) => dispatch =>
  axios.post('/api/designs', { name, sex, price, imageUrl })
  .then(res => res.data)
  .then((addedDesign) => {
    dispatch(setDesign(addedDesign));
  })
  .catch(console.error);

