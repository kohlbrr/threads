import React from 'react';

const CheckoutCartItem = ({ cartItem }) => {
  const { name, price, size, color, quantity } = cartItem;
  return (
    <div className="row">
        <div className="col-md-9">
          <h3 className="name">{name}</h3>
          <p>
            Color:
            <span className="color">{color} | </span>
            | Size:
            <span className="size">{size} | </span>
            | Quantity:
            <span className="quantity">{quantity} | </span>
            | Sub-total:
          $<span className="price">{(+price) * (+quantity)}</span>
          </p>
        </div>
    </div>
  );
};

export default CheckoutCartItem;
