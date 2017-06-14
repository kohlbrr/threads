import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LoginForm from '../components/LoginForm';
import { login, setUser } from '../action-creators/users';


class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { email, password } = this.state;
    this.setState({
      loading: true,
    });
    this.props.login(email, password)
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
      <LoginForm
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }
}

export default connect(null, { login, setUser })(LoginContainer);
