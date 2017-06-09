import { expect } from 'chai';

import { createStore } from 'redux';
import rootReducer from '../../../src/react/reducers/root-reducer';
import { setCurrentUser } from '../../../src/react/action-creators/users';
import { receiveCart, addCartContent, removeCartContent, updateQuantity } from '../../../src/react/action-creators/carts';
import { setCurrentOrder, receiveOrders, addOrder } from '../../../src/react/action-creators/orders';
import { setCurrentProduct } from '../../../src/react/action-creators/products';
import { setCurrentDesign } from '../../../src/react/action-creators/designs';
import { setCurrentCategory, receiveCategories, addCategory, removeCategory } from '../../../src/react/action-creators/categorys';

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

  it('executes a thunk on dispatch', () => {
    const newThunk = spy();
    testStore.dispatch(newThunk());
    expect(newThunk).to.have.been.called;
  });

  // currentUser
  describe('SET_CURRENT_USER', () => {
    const user = {
      name: 'Jhonny Notaperson',
      email: 'thunk@bunk.krunk',
      password: '2fo98t8j5otdm489tg'
    };
    it('updates currentUser on the store', () => {
      testStore.dispatch(setCurrentUser({ type: 'SET_CURRENT_USER', user: user }));
      const newState = testStore.getState();
      expect(testStore.currentUser).to.be.deep.equal(user);
    });
  });

  // cart
  describe('RECEIVE_CART', () => {
    const cartContents = [{
      quantity: 10,
      userId: 2,
      productId: 1
    },{
      quantity: 2,
      userId: 7,
      productId: 34
    }];
    it('updates cart with a collection of cartContents', () => {
      testStore.dispatch(receiveCart({ type: 'RECEIVE_CART', cartContents: cartContents }));
      const newState = testStore.getState();
      expect(newState.cart).to.be.deep.equal(cartContents);
    });
  });

  describe('ADD_CART_CONTENT', () => {
    const cartContent = {
      quantity: 2,
      userId: 1,
      productId: 2
    };
    it('adds a cartcontent to the store', () => {
      testStore.dispatch(addCartContent({ type: 'ADD_CART_CONTENT', cartContent: cartContent }));
      const newState = testStore.getState();
      expect(newState.cart[0]).to.be.deep.equal(cartContent); // may need to play with this validation
    });
  });

  describe('UPDATE_QUANTITY', () => { //~~~~~
    const updateObj = { cartId: 1, quantity: 10 }
    it('updates a cartcontent in the cart', () => {
      testStore.dispatch(updateQuantity({ type: 'UPDATE_QUANTITY', updateObj: updateObj }));
      const newState = testStore.getState();
      expect(newState.cart); // cart id 1 quantity === 10
    });
  });

  describe('REMOVE_CART_CONTENT', () => { //~~~~~
    it('removes a cartcontent from the store cart', () => {
      testStore.dispatch(removeCartContent({ type: 'REMOVE_CART_CONTENT', cartContentId: 1 }));
      const newState = testStore.getState();
      expect(newState.cart); // to not include a cartContent with id === 1
    });
  });

  // orders
  describe('RECEIVE_ORDERS', () => {
    const orders = [{
      status: 'Shipped',
      timestamp: 1000,
      userId: 2
    },{
      status: 'Canceled',
      timestamp: 9001,
      userId: 7
    }];
    it('updates orders with a collection of orders', () => {
      testStore.dispatch(receiveOrders({ type: 'RECEIVE_ORDERS', orders: orders }));
      const newState = testStore.getState();
      expect(newState.orders).to.be.deep.equal(orders);
    });
  });

  describe('ADD_ORDER', () => {
    const order = {
      status: 'Shipped',
      timestamp: 2000,
      userId: 7
    };
    it('adds an order to the store', () => {
      testStore.dispatch(addOrder({ type: 'ADD_CART_CONTENT', order: order }));
      const newState = testStore.getState();
      expect(newState.order[0]).to.be.deep.equal(order); // may need to play with this validation
    });
  });

  // currentOrder
  describe('SET_CURRENT_ORDER', () => {
    const order = {
      status: 'Shipped',
      timestamp: 0,
      userId: 1
    };
    it('updates currentOrder on the store', () => {
      testStore.dispatch(setCurrentOrder({ type: 'SET_CURRENT_ORDER', order: order }));
      const newState = testStore.getState();
      expect(testStore.currentUser).to.be.deep.equal(order);
    });
  });
  
  // currentProduct
  describe('SET_CURRENT_PRODUCT', () => {
    const product = {
      size: 'M',
      color: 'Red',
      stock: 100,
      imageUrl: 'http://fake.horse',
      designId: 1
    };
    it('updates currentProduct on the store', () => {
      testStore.dispatch(setCurrentProduct({ type: 'SET_CURRENT_PRODUCT', product: product }));
      const newState = testStore.getState();
      expect(testStore.currentProduct).to.be.deep.equal(product);
    });
  });
  
  // currentDesign
  describe('SET_CURRENT_DESIGN', () => {
    const design = {
      name: 'Geoff Shirt',
      sex: 'M',
      price: 20.00,
      categoryId: 1
    };
    it('updates currentDesign on the store', () => {
      testStore.dispatch(setCurrentDesign({ type: 'SET_CURRENT_DESIGN', design: design }));
      const newState = testStore.getState();
      expect(testStore.currentDesign).to.be.deep.equal(design);
    });
  });

  // categories
  describe('RECEIVE_CATEGORIES', () => {
    const categories = [{
      name: 'Tee Shirt'
    }];
    it('updates categories with a collection of categories', () => {
      testStore.dispatch(receiveCategories({ type: 'RECEIVE_CATEGORIES', categories: categories }));
      const newState = testStore.getState();
      expect(newState.categories).to.be.deep.equal(categories);
    });
  });

  describe('ADD_CATEGORY', () => {
    const category = {
      name: 'Sweatshirt'
    };
    it('adds a category to the store', () => {
      testStore.dispatch(addCategory({ type: 'ADD_CART_CONTENT', category: category }));
      const newState = testStore.getState();
      expect(newState.category[0]).to.be.deep.equal(category); // may need to play with this validation
    });
  });

  describe('REMOVE_CATEGORY', () => { //~~~~~
    it('removes a category from the store', () => {
      testStore.dispatch(removeCategory({ type: 'REMOVE_CATEGORY', cartContentId: 1 }));
      const newState = testStore.getState();
      expect(newState.categories); // to not include a category with id === 1
    });
  });

  // currentCategory
  describe('SET_CURRENT_CATEGORY', () => {
    const category = {
      name: 'Geoff Shirt',
      sex: 'M',
      price: 20.00,
      categoryId: 1
    };
    it('updates currentCategory on the store', () => {
      testStore.dispatch(setCurrentCategory({ type: 'SET_CURRENT_Category', category: category }));
      const newState = testStore.getState();
      expect(testStore.currentCategory).to.be.deep.equal(category);
    });
  });

});
