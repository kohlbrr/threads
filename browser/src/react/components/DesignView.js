import React from 'react';
import DesignDetail from './DesignDetail';
import ProductPreview from './ProductPreview';

const DesignView = ({ design,
  selectedColor,
  changeColor,
  changeProduct,
  currentProduct,
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
      </div>
    </div>
  </div>
);

export default DesignView;
