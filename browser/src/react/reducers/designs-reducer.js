import { RECEIVE_DESIGNS, RECEIVE_DESIGN } from '../constants';

const initialDesignsState = [];

export default function (state = initialDesignsState, action) {

  switch (action.type) {

    case RECEIVE_DESIGNS:
      return action.designs;

    case RECEIVE_DESIGN:
      return action.design;

    default:
      return state;
  }
}
