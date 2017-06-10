import React from 'react';

const ProductPreview = ({ design, imageUrl }) => (
  <div>
    <h1>{design.name}</h1>
    <img className="img-thumbnail" alt="Product" src={imageUrl || design.imageUrl} />
  </div>
);

export default ProductPreview;
