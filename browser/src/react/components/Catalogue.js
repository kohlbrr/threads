import React from 'react';
import DesignItem from './DesignItem';

const Catalogue = ({ designs }) => (
  <div className="row">
    {designs.map(design => (
      <div className="col-md-4">
        <DesignItem design={design} />
      </div>
    ))}
  </div>
);

export default Catalogue;
