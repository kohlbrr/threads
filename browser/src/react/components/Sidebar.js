import React from 'react';
import { Link } from 'react-router';

export default function Sidebar({ categories }) {


  return (
    <sidebar>
      <h3>Categories</h3>
      <ul className="list-unstyled">
        {categories &&
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
