import { connect } from 'react-redux';
import CartView from '../components/CartView';
import { removeFromCart, updateQuantity } from '../action-creators/cart';

const mapStateToProps = ({ cart }) => ({ cart });
export default connect(mapStateToProps, { removeFromCart, updateQuantity })(CartView);
