import React, { Component } from 'react';
// import SidebarContainer from '../containers/SidebarContainer';
import Sidebar from './Sidebar';

import NavbarContainer from '../containers/NavbarContainer';

export default function App({ children }) {
  return (
    <div id="main" className="container-fluid">
      <NavbarContainer currentUser={{ name: 'guest', email: 'guest@guest' }} logout={function () { console.log('Logout');}} />
      <Sidebar categories={[{ id: 1, name: 'category 1' }]} />

      <div className="col-xs-2">
        <h1> React is working !!! </h1>
      </div>
      <div className="col-xs-10">
        { children }
      </div>
    </div>
  );
}
