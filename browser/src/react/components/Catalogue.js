import React from 'react';
import DesignItem from './DesignItem';
import Sidebar from './Sidebar';

const Catalogue = ({ designs, categories, selectCategory }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3">
        <Sidebar categories={categories} selectCategory={selectCategory} />
      </div>
      <div className="col-md-9">
        <h1>Catalogue</h1>
        <div className="row">
          {designs && designs.filter(design => design.categoryId === categories.selected.id)
            .map(design => (
              <div className="col-md-4" key={design.id} >
                <DesignItem design={design} />
              </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);


export default Catalogue;
