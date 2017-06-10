import { SET_CURRENT_DESIGN } from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_DESIGN:
      return action.design;
    default:
      return state;
  }
};
