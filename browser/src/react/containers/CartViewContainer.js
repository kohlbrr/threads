import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CartView from '../components/CartView';
import { removeFromCart, updateQuantity } from '../action-creators/cart';
import { setCurrentOrder } from '../action-creators/currentOrder';

const mapStateToProps = ({ cart }) => ({ cart });

const mapDispatchToProps = dispatch => ({
  removeFromCart,
  updateQuantity,
  handleCheckout(cart) {
    dispatch(setCurrentOrder(cart));
    browserHistory.push('/checkout');
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartView);
