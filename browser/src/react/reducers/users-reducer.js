import {
  RECEIVE_USERS, RECEIVE_USER, SET_SELECTED_USER,
} from '../constants';

const initialUsersState = {
  selected: {},
  list: [],
};

export default function (state = initialUsersState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {

    case RECEIVE_USERS:
      newState.list = action.users;
      break;

    case RECEIVE_USER:
      newState.list.push(action.user);
      break;

    case SET_SELECTED_USER:
      newState.selected = action.user;
      break;

    default:
      return state;

  }

  return newState;
}
