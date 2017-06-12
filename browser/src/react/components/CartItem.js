import React from 'react';
import { Link } from 'react-router';

function loadOptions(stock) {
  const options = [];
  for (let i = 1; i <= stock; i += 1) {
    options.push(<option value={stock}>{stock}</option>);
  }
  return options;
}

const CartItem = ({ cartItem, updateQuantity, removeFromCart }) => {
  const { imageUrl, name, price, size, color, designId, stock, quantity } = cartItem;
  return (
    <div className="row thumbnail">
      <Link to={`/designs/${designId}`} >
        <div className="col-md-3">
          <img alt="Product" className="img-responsive" src={imageUrl} />
        </div>
        <div className="col-md-9">
          <h3 className='name'>{name}</h3>
          <p>
            Color:
            <span className="color">{color}</span>
            | Price:
            <span className="size">{size}</span>
          </p>
          <div style={{ float: 'right' }}>
            <p>$ <span className="price">{price}</span></p>
            <select value={quantity} onChange={e => updateQuantity(cartItem, e.target.value)}>
              {loadOptions(stock)}
            </select>
            <button onClick={() => removeFromCart(cartItem)} className="btn btn-danger btn-sm delete">Delete Item</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CartItem;
