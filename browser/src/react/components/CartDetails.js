import React from 'react';

const CartDetail = ({ totalPrice, handleCheckout }) => (
  <div>
    <h2 className="totalPrice">$ {totalPrice}</h2>
    <button
      onClick={handleCheckout}
      className="btn btn-primary btn-lg checkout"
    >Check Out</button>
  </div>
);

export default CartDetail;
