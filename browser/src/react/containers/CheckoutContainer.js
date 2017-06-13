import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { placeOrder, updateOrder } from '../action-creators/currentOrder';
import CheckoutView from '../components/CheckoutView';

class CheckoutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
    this.errorInPayment = this.errorInPayment.bind(this);
  }
  handleEditCart() {
    browserHistory.push('/cart');
  }

  errorInPayment(bool) {
    this.setState({
      error: bool,
    });
  }

  render() {
    return (
      <CheckoutView
        currentUser={this.props.currentUser}
        placeOrder={this.props.placeOrder}
        error={this.state.error}
        order={this.props.currentOrder}
        handleEditCart={this.handleEditCart}
        errorInPayment={this.errorInPayment}
        totalPrice={this.props.totalPrice}
        updateOrder={this.props.updateOrder}
      />
    );
  }

}


const mapStateToProps = ({ currentOrder, currentUser }) => ({
  currentOrder,
  currentUser,
  totalPrice: currentOrder.cart.reduce((total, item) =>
    total + Number(item.price), 0).toFixed(2),
});


export default connect(mapStateToProps, { placeOrder, updateOrder })(CheckoutContainer);

