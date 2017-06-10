import React from 'react';
import { Route, IndexRedirect } from 'react-router';

// import SidebarContainer from '../containers/SidebarContainer';

import NavbarContainer from './NavbarContainer';

export default function App({ children }) {
  return (
    <div id="main">
      <NavbarContainer currentUser={{ name: 'guest', email: 'guest@guest' }} logout={function () { console.log('Logout');}} />
      {children}
    </div>
  );
}

