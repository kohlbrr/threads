import React, { Component } from 'react';
// import SidebarContainer from '../containers/SidebarContainer';
import SidebarContainer from './SidebarContainer';

import NavbarContainer from './NavbarContainer';


export default class App (props) {
  constructor(){
    super()
  }
  return (
    <div id="main" className="container-fluid">
      <NavbarContainer currentUser={{ name: 'guest', email: 'guest@guest' }} 
        logout={function () { console.log('Logout');}} />

      <SidebarContainer categories={[{ id: 1, name: 'category 1' }]} />

      <div className="col-xs-2">
        <h1> React is working !!! </h1>
      </div>
      <div className="col-xs-10">
        { children }
      </div>
    </div>
  );
}
