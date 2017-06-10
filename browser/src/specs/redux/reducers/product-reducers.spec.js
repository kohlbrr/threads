import { expect } from 'chai';
import productReducer from '../../../react/reducers/product-reducer';

describe('currentProduct Reducer', () => {
  it('should start with an initial state of an empty object', () => {
    expect(productReducer(undefined, { type: 'INIT_STORE' })).to.deep.equal({});
  });
  it('should change the state to the new currentProduct', () => {
    const state = { name: 'T-Shirt' };
    const product = { name: 'Pants' };
    const action = {
      type: 'CHANGE_PRODUCT',
      product,
    };
    expect(productReducer(state, action).name).to.equal('Pants');
  });
  it('should return a new object', () => {
    const state = { name: 'T-Shirt' };
    const product = { name: 'Pants' };
    const action = {
      type: 'CHANGE_PRODUCT',
      product,
    };
    expect(productReducer(state, action)).to.not.equal(state);
  });
});
