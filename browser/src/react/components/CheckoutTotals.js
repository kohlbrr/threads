import React from 'react';
import CartList from './CartList';
import CartDetails from './CartDetails';

const CheckoutTotals = (props) => {
  const totalPrice = props.cart.reduce((subtotal, cartItem) => subtotal + cartItem.price, 0);
  return (
    <div className="col-sm-12 container">
      <CartList cart={props.cart} />
      <CartDetails totalPrice={totalPrice} />
    </div>
  );
};

export default CheckoutTotals;
