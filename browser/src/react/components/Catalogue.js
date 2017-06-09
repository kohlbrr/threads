import React from 'react';
import DesignItem from './DesignItem';
import Sidebar from './Sidebar';
const Catalogue = ({ designs, categories }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-3">
        <Sidebar categories={categories} />
      </div>
      <div className="col-md-9">
        <div className="row">
          {designs.map(design => (
            <div className="col-md-4">
              <DesignItem design={design} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Catalogue;
