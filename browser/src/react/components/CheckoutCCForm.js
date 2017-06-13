import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class CCForm extends React.Component {
  constructor(props) {
    super(props);
    this.message = ""
    this.onToken = this.onToken.bind(this);
  }

  onToken(token) {
    axios.post('/payment', { token, amount: 5000 })
    .then(console.log)
    .catch(console.error);
  }

  render() {
    const { currentUser, totalPrice } = this.props;
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_sKvyZYLCMQfeFrX2f7eovmio"
          email={currentUser && currentUser.email}
          amount={5000}
        />
        {this.message}
      </div>
    );
  }
}
