import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../action-creators/users';
// import SidebarContainer from '../containers/SidebarContainer';

import Navbar from '../components/Navbar';

function App({ children, currentUser, logout }) {
  return (
    <div id="main">
      <Navbar currentUser={currentUser} logout={logout} />
      {children}
    </div>
  );
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
});

export default connect(mapStateToProps, { logout })(App);

