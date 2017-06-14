import React from 'react';
import CartItem from './CartItem';

const CartList = ({ cart, updateQuantity, removeFromCart }) => (
  <div>
    {cart.map(cartItem => (
      <CartItem
        key={cartItem.productId}
        updateQuantity={updateQuantity}
        cartItem={cartItem}
        removeFromCart={removeFromCart}
      />
    ))}
  </div>
);

export default CartList;
