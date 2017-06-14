import { connect } from 'react-redux';
import React from 'react'
import Reviews from '../components/Reviews';
import { addReview } from '../action-creators/currentDesign';

class ReviewsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 5,
      content: '',
      loading: false,
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { stars, content } = this.state;
    this.setState({
      loading: true,
    });
    this.props.addReview(content, stars, this.props.id)
    .then(() => {
      this.setState({
        loading: false,
        error: null,
      });
    }).catch(error => this.setState({
      error,
      loading: false,
    }));
  }

  render() {
    return (
      <Reviews
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({ currentDesign }) => ({
  reviews: currentDesign.reviews,
  id: currentDesign.id,
});


export default connect(mapStateToProps, { addReview })(ReviewsContainer);
