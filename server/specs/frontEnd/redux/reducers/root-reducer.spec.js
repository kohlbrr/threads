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
    it('sets the current user', () => {
      testStore.dispatch({ type: 'SET_CURRENT_USER', userId: userId }); // TODO
      const newState = testStore.getState();
      expect(newState.currentUser).to.be.deep.equal(/*user with ID in the db*/);
    });
  });

  // cart
  describe('RECEIVE_CART', () => {
    it('populates a users cart from the db', () => {
      testStore.dispatch({ type: 'RECEIVE_CART', userId: userId }); // CurrentUser ID or a var for admins
      const newState = testStore.getState();
      // test if equal
    });
  });

  describe('ADD_CART_ITEM', () => {
    it('adds a cartcontent to the store', () => {});
  });

  describe('REMOVE_CART_ITEM', () => {
    it('removes a cartcontent from the store cart', () => {});
  });

  // orders
  describe('RECEIVE_ORDERS', () => {
    it('populates orders form the db', () => {});
  });

  describe('ADD_ORDER', () => {
    it('adds an order to the store', () => {});
  });

  // currentOrder
  describe('SET_CURRENT_ORDER', () => {
    it('sets the current order', () => {});
  });
  
  // currentProduct
  describe('SET_CURRENT_PRODUCT', () => {
    it('sets the current product', () => {});
  });
  
  // currentDesign
  describe('SET_CURRENT_DESIGN', () => {
    it('sets the current design', () => {});
  });

  // categories
  describe('RECEIVE_CATEGORIES', () => {
    it('populates categories from the db', () => {});
  });

  describe('ADD_CATEGORY', () => {
    it('adds a category to the store');
  });

  describe('REMOVE_CATEGORY', () => {
    it('removes a category from the store');
  });

  // currentCategory
  describe('SET_CURRENT_CATEGORY', () => {
    it('sets the current category', () => {});
  });

});
