import React from 'react';
import { Link } from 'react-router';

const CartItem = ({ cartItem }) => {
  const { imageUrl, name, price, size, color, designId } = cartItem;
  return (
    <div className="row thumbnail">
      <Link to={`/designs/${designId}`} >
        <div className="col-md-3">
          <img alt="Product" className="img-responsive" src={imageUrl} />
        </div>
        <div className="col-md-9">
          <h3 className="name">{name}</h3>
          <p>
            Color:
            <span className="color">{color}</span>
            | Price:
            <span className="size">{size}</span>
          </p>
          <div style={{ float: 'right' }}>
            $ <span className="price">{price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CartItem;
