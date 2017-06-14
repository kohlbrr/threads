import { RECEIVE_DESIGNS, RECEIVE_DESIGN } from '../constants';

export default function (state = [], action) {
  switch (action.type) {

    case RECEIVE_DESIGNS:
      return action.designs;

    case RECEIVE_DESIGN:
      return [...state, action.design];
    default:
      return state;
  }
}
