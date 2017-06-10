import axios from 'axios';
import { RECEIVE_USERS, RECEIVE_USER, SET_SELECTED_USER } from '../constants';


export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users,
});

export const createUser = user => ({
  type: RECEIVE_USER,
  user,
});

export const setSelectedUser = user => ({
  type: SET_SELECTED_USER,
  user,
});

export const fetchUsers = () => dispatch =>
  axios.get('/api/users')
  .then(res => res.data)
  .then(users => dispatch(receiveUsers(users)))
  .catch(console.error);

export const receiveUser = user => dispatch =>
  axios.post('/api/users/', user)
  .then(res => res.data)
  .then(addedUser => dispatch(createUser(addedUser)))
  .catch(console.error);
