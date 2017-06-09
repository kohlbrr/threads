import React from 'react';
import { Link } from 'react-router';

const DesignItem = ({ design }) => (
  <div>
    <Link to={`/designs/${design.id}`}>
      <h3>{design.name}</h3>
      <img alt="design" src={design.imageUrl} />
      <p>${design.price}</p>
    </Link>
  </div>
);

export default DesignItem;
