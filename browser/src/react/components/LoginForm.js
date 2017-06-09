import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input id="email" name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input id="password" name="password" type="password" />
        </div>
        <div>
          <button id="login" type="submit">{ displayName }</button>
          <button id="cancel" >Cancel</button>
        </div>
        { error && <div> { error.response.data } </div> }
      </form>
      <a href="/auth/google">{ displayName } with Google</a>
      <a href="/auth/facebook">{ displayName } with Facebook</a>
    </div>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
};
