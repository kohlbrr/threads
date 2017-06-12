import React from 'react';


function getImage(imgUrl) {
  const img = document.images[0];
  const imageLoading = new Image();
  if (img) {
    img.src = 'https://cdn.dribbble.com/users/8424/screenshots/1036999/dots_2.gif';
  }
  imageLoading.onload = function attachSourceToImage() {
    img.src = this.src;
  };
  imageLoading.src = imgUrl;
  return null;
}

const ProductPreview = ({ design, imageUrl }) => (
  <div>
    <h1>{design.name}</h1>
    <img className="img-thumbnail" alt="Product" src="" />
    {getImage(imageUrl || design.imageUrl)}
  </div>
);

export default ProductPreview;
