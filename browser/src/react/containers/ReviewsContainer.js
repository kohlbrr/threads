import { connect } from 'react-redux';
import React from 'react'
import Reviews from '../components/Reviews';
import { addReview } from '../action-creators/reviews';
import { browserHistory } from 'react-router';
import store from '../store'

class ReviewsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 5,
      content: '',
      loading: false,
      error: null,
    };
    console.log(props, 'HIHIHIHIHIHIHHIHIHI')
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
    this.props.addReview(stars, content)
    .then(() => {
      this.setState({
        loading: false,
        error: null,
      });
      browserHistory.push('/');
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
      />
    );
  }
}

const mapStateToProps = ({ currentDesign }) => ({
  reviews: currentDesign.reviews,
});


export default connect(mapStateToProps, { addReview })(ReviewsContainer);
