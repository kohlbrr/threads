import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class CCForm extends React.Component {
  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
  }

  onToken(token) {
    axios.post('/payment', { token, amount: Number((this.props.totalPrice * 100).toFixed(0)) })
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
        <div style={{ marginBottom: 30 }} >
          {this.props.promocode ?
            <p className="bg-success">PromoCode Valid!</p>
            : <div>
              <p>Sumbmit Promo Code:</p>
              <input
                value={this.props.promocodeInput}
                onChange={this.props.handleInputChange}
                style={{ marginBottom: 10 }}
                className="form-control"
              />
              <button
                onClick={this.props.validatePromoCode}
                className="btn btn-primary btn-sm"
              > Submit </button>
              {this.props.promocodeError ?
                <p style={{ color: 'red' }}>Your Promocode is not valid!</p>
                : null
              }
            </div>
          }
        </div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_sKvyZYLCMQfeFrX2f7eovmio"
          email={currentUser && currentUser.email}
          amount={Number((totalPrice * 100).toFixed(0))}
        />
        {this.props.error ?
          <p style={{ color: 'red' }}>There has been an error with your payment </p> : null}
      </div>
    );
  }
}
