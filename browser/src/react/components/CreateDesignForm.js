import React from 'react';

const CreateDesignForm = ({
  name,
  price,
  imageUrl,
  error,
  loading,
  handleSubmit,
  handleChange }) => {
  return (
    <div className="container">
      <form style={{ margin: '0 auto', width: 300 }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"><small>Design Name</small></label>
          <input
            value={name}
            className="name form-control"
            onChange={e => handleChange(e.target)}
            name="name"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="sex"><small>Gender</small></label>
          <select onChange={e => handleChange(e.target)} name="sex" required>
            <option value={'M'}>M</option>
            <option value={'F'}>F</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price"><small>Price</small></label>
          <input
            value={price}
            className="price form-control"
            onChange={e => handleChange(e.target)}
            name="price"
            type="number"
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"><small>imageUrl</small></label>
          <input
            value={imageUrl}
            className="password form-control"
            onChange={e => handleChange(e.target)}
            name="imageUrl"
            type="text"
          />
        </div>
        <div>
          <button
            className="login btn btn-primary btn-lg"
            type="submit"
          >Submit</button>
        </div>
        { error && <div> { 'Design name is taken!!' } </div> }
        { loading && <p>Loading...</p> }
      </form>
    </div>
  );
};

export default CreateDesignForm;
