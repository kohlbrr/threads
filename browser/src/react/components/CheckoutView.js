import React from 'react';
import CheckoutTotals from './CheckoutTotals';
import CheckoutCCForm from './CheckoutCCForm';

const CheckoutView = ({
  order,
  placeOrder,
  error,
  handleEditCart,
  currentUser,
  totalPrice,
  errorInPayment,
  updateOrder,
  validatePromoCode,
  handleInputChange,
  promocodeInput,
  promocode,
  promocodeError,
}) => (
  <div className="container">
    {order.orderPlaced ?
      <h3>Your order will be shipped soon</h3> :
      <div className="row">
        <div className="col-sm-6">
          <CheckoutTotals totalPrice={totalPrice} cart={order.cart} handleEditCart={handleEditCart} />
        </div>
        <div className="col-md-6">
          <CheckoutCCForm
            order={order}
            currentUser={currentUser}
            totalPrice={totalPrice}
            placeOrder={placeOrder}
            error={error}
            errorInPayment={errorInPayment}
            updateOrder={updateOrder}
            validatePromoCode={validatePromoCode}
            handleInputChange={handleInputChange}
            promocodeInput={promocodeInput}
            promocode={promocode}
            promocodeError={promocodeError}
          />
        </div>
      </div>
    }
  </div>
);

export default CheckoutView;

