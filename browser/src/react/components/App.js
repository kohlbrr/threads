import React, { Component } from 'react';

import SidebarContainer from '../containers/SidebarContainer';
import NavbarContainer from '../containers/NavbarContainer';

export default function App({ children }) {
  return (
    <div id="main" className="container-fluid">
      <NavbarContainer />
      <div className="col-xs-2">
        <SidebarContainer />
      </div>
      <div className="col-xs-10">
        { children }
      </div>
    </div>
  );
}