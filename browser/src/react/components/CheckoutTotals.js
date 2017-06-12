import React from 'react';
import CheckoutCartItem from './CheckoutCartItem';

const CheckoutTotals = (props) => {
  const totalPrice = props.cart.reduce((subtotal, cartItem) => subtotal + (cartItem.price * cartItem.quantity), 0).toFixed(2);
  return (
    <div className="container">
      <div>
        {
        props.cart.map(cartItem => (
          <CheckoutCartItem
            key={cartItem.productId}
            cartItem={cartItem}
          />))
        }
      </div>
      <div>
        <h2 className="totalPrice">$ {totalPrice}</h2>
      </div>
      <button className="btn btn-primary btn-lg checkout">Edit Cart</button>
    </div>
  );
};

export default CheckoutTotals;
