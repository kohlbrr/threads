import { connect } from 'react-redux';
import { Catalogue } from '../components/Catalogue';


const mapStateToProps = ({ designs }) => ({ designs });

export default connect(mapStateToProps)(Catalogue);
