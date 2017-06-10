import {
  SET_CURRENT_USER,
} from '../constants';

const initialCurrentUserState = {
  currentUser: {},
};

export default function (state = initialCurrentUserState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {

    case SET_CURRENT_USER:
      newState.currentUser = action.user;
      break;

    default:
      return state;

  }

  return newState;
}
