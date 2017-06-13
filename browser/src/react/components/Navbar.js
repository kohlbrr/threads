import React from 'react';
import { Link } from 'react-router';
import store from '../store';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }


  renderLoginSignup() {
    if (!this.props.currentUser) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      );
    }
    return null;
  }

  renderLogout() {
    const User = store.getState().currentUser;
    if (this.props.currentUser) {
      return (
        <ul className="nav navbar-nav navbar-right">
          {
            User.isAdmin ?
              <li className="dropdown">
                <Link to="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin<span className="caret" /></Link>
                <ul className="dropdown-menu">
                  <li><Link to="/createdesign">Create Design</Link></li>
                  <li><Link to="/createproduct">Create Product</Link></li>
                  <li><Link to="/reports">Reports</Link></li>
                </ul>
              </li> :
              null
          }
          <li className="dropdown">
            <Link to="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.currentUser.name}<span className="caret" /></Link>
            <ul className="dropdown-menu">
              <li><Link to="/orders">Orders</Link></li>
            </ul>
          </li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link onClick={this.props.logout}>Logout</Link></li>
        </ul>
      );
    }
    return null;
  }
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/">Threads</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {this.renderLoginSignup() || this.renderLogout()}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;

