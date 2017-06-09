import React, { Component } from 'react';
// import SidebarContainer from '../containers/SidebarContainer';
import Sidebar from './Sidebar';

import NavbarContainer from '../containers/NavbarContainer';

const dummyUser = { name: 'guest', email: 'guest@guest' };

export default function App({ children }) {
  return (
    <div id="main" className="container-fluid">
      <NavbarContainer currentUser={{ name: 'guest', email: 'guest@guest' }} logout={function () { console.log('Logout');}} />
        { children }
    </div>
  );
}
