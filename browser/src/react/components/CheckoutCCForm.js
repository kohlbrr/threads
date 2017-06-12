import React from 'react';

const CCForm = ({ card, expiration, error, loading, handleSubmit, handleChange }) => {
  return (
    <div className="container">
      <form style={{ padding: 1, width: 100}} onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="CardNumber"><small>CardNumber</small></label>
          <input
            value={card}
            className="expiration form-control"
            onChange={e => handleChange(e.target)}
            name="card"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiration"><small>Expiration</small></label>
          <input
            value={expiration}
            className="expiration form-control"
            onChange={e => handleChange(e.target)}
            name="expiration"
            type="expiration"
          />
        </div>

        <div>
          <button
            className="pay btn btn-primary btn-lg"
            type="submit"
          >Pay</button>
        </div>

        { error && <div> { error.response.data.message } </div> }
        { loading && <p>Loading...</p> }
      </form>
    </div>
  );
};

export default CCForm;
