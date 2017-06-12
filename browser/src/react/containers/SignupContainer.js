import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import SignupForm from '../components/SignupForm';
import { signup } from '../action-creators/users';

class SignupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
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
    const { name, email, password } = this.state;
    this.setState({
      loading: true,
    });
    this.props.signup(name, email, password)
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
      <SignupForm
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }
}

export default connect(null, { signup })(SignupContainer);
