import React from 'react';
import DesignDetail from './DesignDetail';
import ProductPreview from './ProductPreview';
import ReviewsContainer from '../containers/ReviewsContainer';
const DesignView = ({ design,
  selectedColor,
  changeColor,
  changeProduct,
  currentProduct,
  addToCart,
}) => (
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <ProductPreview
          design={design}
          imageUrl={design.products && selectedColor && design.products.find(({ color }) => color === selectedColor).imageUrl}
        />
      </div>
      <div className="col-md-6">
        <DesignDetail
          design={design}
          selectedColor={selectedColor}
          changeColor={changeColor}
          changeProduct={changeProduct}
        />
        <div style={{ marginTop: 20}}>
          {currentProduct ?
            <button className="btn btn-success btn-lg" onClick={() => addToCart(currentProduct, design)}>Add to Cart</button>
            : <p>Please Select a Color and a Size</p>}
        </div>
      </div>
    </div>
    <div style={{ marginTop: 30}}>
    <ReviewsContainer />
    </div>
  </div>
);

export default DesignView;
