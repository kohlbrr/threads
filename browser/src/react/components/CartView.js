import React from 'react';
import { browserHistory } from 'react-router';
import CartList from './CartList';
import CartDetails from './CartDetails';

function handleCheckout() {
  browserHistory.push('/checkout');
}

const CartView = ({ cart, updateQuantity, removeFromCart, handleCheckout }) => {
  const totalPrice = cart.reduce((subtotal, cartItem) => subtotal + (cartItem.price * cartItem.quantity), 0).toFixed(2);
  return (
    <div className="row">
      <div className="col-md-9">
        <CartList
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          cart={cart}
        />
      </div>
      <div className="col-md-3">
        <CartDetails totalPrice={totalPrice} handleCheckout={() => handleCheckout(cart)} />
      </div>
    </div>
  );
};

export default CartView;
