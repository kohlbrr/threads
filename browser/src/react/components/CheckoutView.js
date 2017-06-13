import React from 'react';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';
import { fetchCart } from '../action-creators/cart';
import store from '../store';
import CheckoutTotals from './CheckoutTotals';
import CheckoutCCForm from './CheckoutCCForm';

//work in progress

class CheckoutView extends React.Component {
  constructor(props){
    super(props);
    this.handleEditCart = this.handleEditCart.bind(this);
  }

  handleEditCart(event){
    console.log('hey');
  }

  render() {
    const cart = store.getState().cart;
    return (
      <div className="container">
        <div className="container col-sm-6">
          <div className="col-sm-6">
            <CheckoutTotals cart={cart} handleEditCart={this.handleEditCart} />
          </div>
        </div>
        <div className="container col-md-6">
          <div className="col-md-6">
            <CheckoutCCForm
              currentUser={this.props.currentUser}
              totalPrice={cart.reduce((total, item) => total + Number(item), 0)} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, { fetchCart })(CheckoutView);
