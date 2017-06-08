import { expect } from 'chai';

import { createStore } from 'redux';
import rootReducer from '../../../../../browser/src/react/reducers/root-reducer';

describe('Root reducer', () => {
  
  let testStore;
  beforeEach('Create a test store', () => {
    testStore = createStore(rootReducer);
  });

  it('has expected initial state', () => {
    expect(testStore.getState()).to.be.deep.equal({
      currentUser: {},
      cart: [{}],
      orders: [{}],
      currentOrder: {},
      currentProduct: {},
      currentDesign = {}, // contains reviews and products
      categories: [{}],
      currentCategory: {} // contains designs
    });
  });

});
