import { CHANGE_PRODUCT } from '../constants';

export const changeProduct = product => ({
  type: CHANGE_PRODUCT,
  product,
});

