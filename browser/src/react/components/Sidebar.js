import React from 'react';
import { Link } from 'react-router';

export default function Sidebar(props) {
  const categories = props.categories;
//   const clothings = props.clothings;

  return (
    <sidebar>
      <ul className="list-unstyled">
        {
          categories.map((category) => {
            return (
              <li key={category.id} className="category-item menu-item">
                <p> testing </p>
              </li>
            );
          })
        }
      </ul>
      <hr />
    </sidebar>
  );
}
