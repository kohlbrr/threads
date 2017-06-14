import React from 'react';
import { Link } from 'react-router';

export default function Sidebar({ categories, selectCategory }) {
  return (
    <sidebar>
      <h3>Categories</h3>
      <ul className="list-unstyled">
        {categories.list &&
          categories.list.map((category) => {
            return (
              <li key={category.id} className="category-item menu-item">
                <Link onClick={() => selectCategory(category)}>{category.name}</Link>
              </li>
            );
          })
        }
      </ul>
      <hr />
    </sidebar>
  );
}
