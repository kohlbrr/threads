import axios from 'axios';
import { RECEIVE_DESIGNS, RECEIVE_DESIGN } from '../constants';


export const receiveDesigns = designs => ({
  type: RECEIVE_DESIGNS,
  designs,
});

export const receiveDesign = design => ({
  type: RECEIVE_DESIGN,
  design,
});

export const fetchDesigns = () => dispatch =>
  axios.get('/api/designs')
  .then(res => res.data)
  .then(designs => dispatch(receiveDesigns(designs)))
  .catch(console.error);


export const addDesign = design => dispatch =>
  axios.post('/api/designs', design)
  .then(res => res.data)
  .then(addedDesign => dispatch(receiveDesign(addedDesign)))
  .catch(console.error);
