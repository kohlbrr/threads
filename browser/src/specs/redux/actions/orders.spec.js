import { expect } from 'chai';

import { setCurrentOrder, receiveOrders, addOrder } from '../../../react/action-creators/orders';

describe('Order actions', () => {
  
  describe('setCurrentOrder', () => {
    it('returns a properly formattd action', () => {
      const order = {
        status: 'Canceled',
        timestamp: 40000,
        userId: 9
      };
      expect(setCurrentOrder(order)).to.be.deep.equal({
        type: 'SET_CURRENT_ORDER',
        order: order
      });
    });
  });

  describe('receiveOrders', () => {
    it('returns a properly formattd action', () => {
      const orders = [{
        status: 'Canceled',
        timestamp: 40000,
        userId: 9
      },{
        status: 'Shipped',
        timestamp: 600000,
        userId: 21
      }];
      expect(receiveOrders(orders)).to.be.deep.equal({
        type: 'RECEIVE_ORDERS',
        orders: orders
      });
    });
  });

  describe('addOrder', () => {
    it('returns a properly formattd action', () => {
      const order = {
        status: 'Pending',
        timestamp: 700000,
        userId: 1
      };
      expect(addOrder(order)).to.be.deep.equal({
        type: 'ADD_ORDER',
        order: order
      });
    });
  });

  // AXIOS STUFF
  // getOrderById

});
