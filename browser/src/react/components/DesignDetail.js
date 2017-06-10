import React from 'react';

function renderColors(products, changeColor) {
  return products
    .map(product => product.color)
    .filter((color, i, self) => self.indexOf(color) === i)
    .map(color => (
      <div style={{ marginTop: 10 }} className="col-md-2">
        <button
          className="btn btn-primary color"
          style={{ backgroundColor: color }}
          onClick={() => changeColor(color)}
        >{color}</button>
      </div>
  ));
}
function renderSizes(products, selectedColor, changeProduct) {
  return products
  .filter(product => product.color === selectedColor)
  .map(product => (
    <div className="col-md-1">
      <button
        className="btn btn-primary size"
        onClick={() => changeProduct(product)}
      >{product.size}</button>
    </div>
  ));
}

const DesignDetail = ({ design, selectedColor, changeColor, changeProduct }) => (
  <div style={{ marginTop: 50 }}>
    <p className="price" style={{ fontSize: 40, fontWeight: '800' }}>{design.price}</p>

    <div style={{ marginTop: 40 }}className="row">
    {design.products && renderColors(design.products, changeColor)}
    </div>
    <div style={{ marginTop: 20 }} className="row">
    {design.products && renderSizes(design.products, selectedColor, changeProduct)}
    </div>
  </div>
);


export default DesignDetail;
