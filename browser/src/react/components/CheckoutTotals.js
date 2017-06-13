import React from 'react';
import CheckoutCartItem from './CheckoutCartItem';

const CheckoutTotals = ({ cart, totalPrice, handleEditCart }) => (
  <div className="container">
    <div>
      {
      cart.map(cartItem => (
        <CheckoutCartItem
          key={cartItem.productId}
          cartItem={cartItem}
        />))
      }
    </div>
    <div>
      <h2 className="totalPrice">$ {totalPrice}</h2>
    </div>
    <button onClick={handleEditCart} className="btn btn-primary btn-lg checkout">Edit Cart</button>
  </div>
);


export default CheckoutTotals;
