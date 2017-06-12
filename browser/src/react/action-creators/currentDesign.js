import axios from 'axios';
import { SET_CURRENT_DESIGN } from '../constants';


export const setCurrentDesign = design => ({
  type: SET_CURRENT_DESIGN,
  design,
});

export const fetchDesign = id => dispatch =>
  axios.get(`/api/designs/${id}`)
  .then(res => res.data)
  .then(design => dispatch(setCurrentDesign(design)))
  .catch(console.error);
