import React from 'react';
import { Link } from 'react-router';

export default function Sidebar(props) {
  const categories = props.categories;
//   const clothings = props.clothings;

  return (
    <sidebar className="col-lg-2" >
      <ul className="list-unstyled">
        {
          categories.map((category) => {
            return (
              <li key={category.id} className="category-item menu-item">
                  { // <Link to={`/categories/${category.id}`}>{category.name}</Link> 
                  }
              </li>
            );
          })
        }
      </ul>
      <hr />
    </sidebar>
  );
}
