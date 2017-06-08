import React, { Component } from 'react';

// import SidebarContainer from '../containers/SidebarContainer';
// import NavbarContainer from '../containers/NavbarContainer';

export default function App({ children }) {
  return (
    <div id="main" className="container-fluid">
      <div className="col-xs-2">
        <h1> React is working !!! </h1>
      </div>
      <div className="col-xs-10">
        { children }
      </div>
    </div>
  );
}
