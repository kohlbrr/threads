import React from 'react';
import CartItem from './CartItem';

const CartList = ({ cart }) => (
  <div>
    {cart.map(cartItem => (
      <CartItem key={cartItem.productId} cartItem={cartItem} />
    ))}
  </div>
);

export default CartList;
