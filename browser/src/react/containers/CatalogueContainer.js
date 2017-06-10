import { connect } from 'react-redux';
import Catalogue from '../components/Catalogue';
import { setCategory } from '../action-creators/categories';


const mapStateToProps = ({ designs, categories }) => ({ designs, categories });

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory(category) {
      dispatch(setCategory(category));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
