import React from 'react';


function getImage(imgUrl) {
  const img = document.images[0];
  const imageLoading = new Image();
  if(img) {
    img.src = 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif';
  }
  imageLoading.onload = function attachSourceToImage() {
    img.src = this.src;
    console.log('image loaded');
  };
  console.log('hello')
  imageLoading.src = imgUrl;
  return null;
}

const ProductPreview = ({ design, imageUrl }) => (
  <div>
    <h1>{design.name}</h1>
    <img className="img-thumbnail" alt="Product" src={''} />
    {getImage(imageUrl || design.imageUrl)}
  </div>
);

export default ProductPreview;
