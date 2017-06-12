import React from 'react';

const SignupForm = ({ name, email, password, error, loading, handleSubmit, handleChange }) => {
  return (
    <div className="container">
      <form style={{ margin: '0 auto', width: 300 }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"><small>Full Name</small></label>
          <input
            value={name}
            className="name form-control"
            onChange={e => handleChange(e.target)}
            name="name"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"><small>Email</small></label>
          <input
            value={email}
            className="email form-control"
            onChange={e => handleChange(e.target)}
            name="email"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"><small>Password</small></label>
          <input
            value={password}
            className="password form-control"
            onChange={e => handleChange(e.target)}
            name="password"
            type="password"
          />
        </div>
        <div>
          <button
            className="login btn btn-primary btn-lg"
            type="submit"
          >Sign Up</button>
        </div>
        { error && <div> { 'Email is already taken!!' } </div> }
        {console.dir(error)}
        { loading && <p>Loading...</p> }
      </form>
    </div>
  );
};

export default SignupForm;
