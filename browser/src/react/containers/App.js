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
<<<<<<< HEAD:browser/src/react/containers/App.js
      <NavbarContainer currentUser={{ name: 'guest', email: 'guest@guest' }} 
        logout={function () { console.log('Logout');}} />

      <SidebarContainer categories={[{ id: 1, name: 'category 1' }]} />

      <div className="col-xs-2">
        <h1> React is working !!! </h1>
      </div>
      <div className="col-xs-10">
=======
      <NavbarContainer currentUser={{ name: 'guest', email: 'guest@guest' }} logout={function () { console.log('Logout');}} />
>>>>>>> bffee499f6cb863db24dc0b4ad0fbd0c4f4b0fad:browser/src/react/components/App.js
        { children }
    </div>
  );
}
