import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class CCForm extends React.Component {
  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
  }

  onToken(token) {
    axios.post('/payment', { token, amount: this.props.totalPrice * 100})
    .then(res => res.data)
    .then((charge) => {
      this.props.updateOrder(charge.id);
      this.props.placeOrder(this.props.order);
      this.props.errorInPayment(false);
    })
    .catch(() => this.props.errorInPayment(true));
  }

  render() {
    const { currentUser, totalPrice } = this.props;
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_sKvyZYLCMQfeFrX2f7eovmio"
          email={currentUser && currentUser.email}
          amount={totalPrice * 100}
        />
        {this.props.error ?
          <p style={{ color: 'red' }}>There has been an error with your payment </p> : null}
      </div>
    );
  }
}
