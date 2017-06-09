import { connect } from 'react-redux';
import { Catalogue } from '../components/Catalogue';


const mapStateToProps = ({ designs, categories }) => ({ designs, categories });

export default connect(mapStateToProps)(Catalogue);
