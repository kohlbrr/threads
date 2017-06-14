import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { placeOrder, updateOrder } from '../action-creators/currentOrder';
import CheckoutView from '../components/CheckoutView';
import axios from 'axios';

class CheckoutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      promocode: false,
      promocodeInput: '',
      promocodeError: false
    };
    this.errorInPayment = this.errorInPayment.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validatePromoCode = this.validatePromoCode.bind(this);
  }

  // handleEditCart() {
  //   browserHistory.push('/cart');
  // }

  handleInputChange(e) {
    this.setState({
      promocodeInput: e.target.value,
    });
  }

  validatePromoCode() {
    axios.post('/api/orders/promocode', { promocode: this.state.promocodeInput })
    .then(() => {
      this.setState({
        promocode: true,
        promocodeInput: '',
        promocodeError: false,
      });
    })
    .catch(() => {
      this.setState({
        promocodeInput: '',
        promocodeError: true,
      });
    });
  }

  errorInPayment(bool) {
    this.setState({
      error: bool,
    });
  }

  render() {
    const totalPrice = (this.props.order.cart.reduce((subtotal, cartItem) => subtotal + (cartItem.price * cartItem.quantity), 0) * (this.state.promocode ? 0.70 : 1)).toFixed(2);
    return (
      <CheckoutView
        totalPrice={totalPrice}
        handleEditCart={this.handleEditCart}
        errorInPayment={this.errorInPayment}
        handleInputChange={this.handleInputChange}
        validatePromoCode={this.validatePromoCode}
        {...this.props}
        {...this.state}
      />
    );
  }

}


const mapStateToProps = ({ currentOrder, currentUser }) => ({
  order: currentOrder,
  currentUser,
});


export default connect(mapStateToProps, { placeOrder, updateOrder })(CheckoutContainer);

