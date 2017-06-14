import React from 'react';

const AddReview = ({ handleChange, handleSubmit, error, loading, content, stars }) => {
  return (
    <div className="row" style={{ marginBottom: 90 }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: 700, height: 100, alignSelf: 'flex-start' }}>
        <div className="form-group">
          <label htmlFor="stars"><small>Stars</small></label>
          <select value={stars} onChange={e => handleChange(e.target)} name="stars" required>
            <option value={'5'}>5</option>
            <option value={'4'}>4</option>
            <option value={'3'}>3</option>
            <option value={'2'}>2</option>
            <option value={'1'}>1</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="content"><small>Add a Review!</small></label>
          <input
            value={content}
            className="content form-control"
            onChange={e => handleChange(e.target)}
            name="content"
            type="text"
          />
        </div>
        <div>
          <button
            className="login btn btn-primary btn-lg"
            type="submit"
          >Submit</button>
        </div>
        { error && <div> { 'Error Creating a Review!!' } </div> }
        { loading && <p>Loading...</p> }
      </form>
    </div>
  );
};


export default AddReview
