import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { logout as logOutUser } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class NavbarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  render() {
    const { user } = this.props;
    return (
     <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Threads</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">

              <li className="dropdown">
                <Link to="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{(user && user.name) || 'Guest' }<span className="caret"></span></Link>
                <ul className="dropdown-menu">
                  <li><Link to="/cart">Cart</Link></li>
                  <li><Link to="/orders">Orders</Link></li>
                </ul>
              </li>
              <li><Link to="/">Logout</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  renderLoginSignup() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/signup" activeClassName="active">signup</Link>
        </li>
        <li>
          <Link to="/login" activeClassName="active">login</Link>
        </li>
      </ul>
    );
  }

  renderLogout() {
    const name = this.props.currentUser.name || this.props.currentUser.email;
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button
          className="navbar-btn btn btn-default"
          onClick={this.props.logout}>
          logout {name}
        </button>
        </li>
      </ul>
    );
  }
}

export default NavbarContainer;

/* -----------------    CONTAINER     ------------------ */

// const mapState = ({ currentUser }) => ({ currentUser });
// // // equivalent to:
// // const mapState = state => {
// //   return {
// //     currentUser: state.currentUser
// //   };
// // };

// const mapDispatch = dispatch => ({
//   logout: () => {
//     dispatch(logOutUser());
//     // browserHistory.push('/'); // removed to demo logout instant re-render
//   }
// });

// export default connect(mapState, mapDispatch)(NavbarContainer);
