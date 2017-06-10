import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import CatalogueContainer from '../containers/CatalogueContainer';

// import SidebarContainer from '../containers/SidebarContainer';
import Sidebar from './Sidebar';

import NavbarContainer from '../containers/NavbarContainer';

export default function App({ children }) {
  return (
    <div id="main">
      <NavbarContainer currentUser={{ name: 'guest', email: 'guest@guest' }} logout={function () { console.log('Logout');}} />
      {children}
    </div>
  );
}
