import React from 'react';
import { browserHistory } from 'react-router';
import CartList from './CartList';
import CartDetails from './CartDetails';

function handleCheckout() {
  browserHistory.push('/chekout');
}

const CartView = ({ cart }) => {
  const totalPrice = cart.reduce((subtotal, cartItem) => subtotal + cartItem.price, 0);
  return (
    <div className="row">
      <div className="col-md-9">
        <CartList cart={cart} />
      </div>
      <div className="col-md-3">
        <CartDetails totalPrice={totalPrice} handleCheckout={handleCheckout} />
      </div>
    </div>
  );
};

export default CartView;
