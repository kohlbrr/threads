import { expect } from 'chai';
import sinoniChai from 'sinon-chai';
import sinon from 'sinon';

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
      currentDesign: {}, // contains reviews and products
      categories: [{}],
      currentCategory: {} // contains designs
    });
  });

  beforeEach('Populate test store', () => {
    // TODO
  });

  // currentUser
  describe('SET_CURRENT_USER', () => {
    it('sets the current user from the db', () => {
      testStore.dispatch({ type: 'SET_CURRENT_USER', userId: 1 });
      const newState = testStore.getState();
      // Spy that the action fired the thunk func
      //expect(newState.currentUser).to.be.deep.equal(); // Potentially not needed
    });
  });

  // cart
  describe('RECEIVE_CART', () => {
    it('populates a users cart from the db', () => {
      testStore.dispatch({ type: 'RECEIVE_CART', userId: 1 }); // CurrentUser ID or a var for admins
      const newState = testStore.getState();
      // Spy that the action fired the thunk func
    });
  });

  describe('ADD_CART_CONTENT', () => {
    const cartContent = {
      quantity: 2,
      userId: 1,
      productId: 2
    };
    it('adds a cartcontent to the store', () => {
      testStore.dispatch({ type: 'ADD_CART_CONTENT', cartContent: cartContent });
      const newState = testStore.getState();
      expect(newState.cart[0]).to.be.deep.equal(cartContent);
    });
  });

  describe('UPDATE_CART_CONTENT', () => {
    const cartContent = {
      quantity: 5,
      userId: 2,
      productId: 1,
      id: 1
    };
    it('updates a cartcontent in the cart', () => {
      testStore.dispatch({ type: 'UPDATE_CART_CONTENT', cartContent:  })
    });
  });

  describe('REMOVE_CART_CONTENT', () => {
    it('removes a cartcontent from the store cart', () => {
      testStore.dispatch({ type: 'REMOVE_CART_CONTENT', cartContentId: 1 });
      const newState = testStore.getState();
      // Spy that the action fired the thunk func
    });
  });

  // orders
  describe('RECEIVE_ORDERS', () => {
    it('populates orders form the db', () => {
      const newState = testStore.getState();
    });
  });

  describe('ADD_ORDER', () => {
    it('adds an order to the store', () => {
      const newState = testStore.getState();
    });
  });

  // currentOrder
  describe('SET_CURRENT_ORDER', () => {
    it('sets the current order', () => {
      const newState = testStore.getState();
    });
  });
  
  // currentProduct
  describe('SET_CURRENT_PRODUCT', () => {
    it('sets the current product', () => {
      const newState = testStore.getState();
    });
  });
  
  // currentDesign
  describe('SET_CURRENT_DESIGN', () => {
    it('sets the current design', () => {
      const newState = testStore.getState();
    });
  });

  // categories
  describe('RECEIVE_CATEGORIES', () => {
    it('populates categories from the db', () => {
      const newState = testStore.getState();
    });
  });

  describe('ADD_CATEGORY', () => {
    it('adds a category to the store', () => {
      const newState = testStore.getState();
    });
  });

  describe('REMOVE_CATEGORY', () => {
    it('removes a category from the store', () => {
      const newState = testStore.getState();
    });
  });

  // currentCategory
  describe('SET_CURRENT_CATEGORY', () => {
    it('sets the current category', () => {
      const newState = testStore.getState();
    });
  });

});
