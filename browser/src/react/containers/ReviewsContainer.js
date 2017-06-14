import { connect } from 'react-redux';
import Reviews from '../components/Reviews';

const mapStateToProps = ({ currentDesign }) => ({
  reviews: currentDesign.reviews,
});

export default connect(mapStateToProps)(Reviews);
