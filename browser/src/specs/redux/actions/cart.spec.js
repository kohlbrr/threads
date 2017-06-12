import { expect } from 'chai';

import { receiveCart, addCartContent, removeCartContent, updateQuantity } from '../../../react/action-creators/cart';

describe('Cart actions', () => {
  
  describe('receiveCart', () => {
    it('returns a properly formatted action', () => {
      const cartContents = [{
        quantity: 10,
        userId: 2,
        productId: 1
      },{
        quantity: 2,
        userId: 7,
        productId: 34
      }];
      expect(receiveCart(cartContents)).to.be.deep.equal({
        type: 'RECEIVE_CART',
        cartContents: cartContents
      });
    });
  });

  describe('addCartContent', () => {
    it('returns a properly formatted action', () => {
      const cartContent = {
        quantity: 10,
        userId: 2,
        productId: 1
      };
      expect(addCartContent(cartContent)).to.be.deep.equal({
        type: 'ADD_CART_CONTENT',
        cartContent: cartContent
      });
    });
  });

  describe('removeCartContent', () => {
    it('returns a properly formatted action', () => {
      expect(removeCartContent(1)).to.be.deep.equal({
        type: 'REMOVE_CART_CONTENT',
        cartContentId: 1
      });
    });
  });

  describe('updateQuantity', () => {
    it('returns a properly formatted action', () => {
      const updateObj = { cartiContentId: 1, quantity: 56 };
      expect(removeCartContent(updateObj)).to.be.deep.equal({
        type: 'UPDATE_QUANTITY',
        cartContentId: 1,
        quantity: 56
      });
    });
  });

  // AXIOS STUFF_
  // getContentByUser
  // createCartContent
  // removeCartContent

});
