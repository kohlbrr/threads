import React from 'react';
import ReviewList from './ReviewList';
import store from '../store';
import AddReview from './AddReview';

const Reviews = ({
  reviews,
  content,
  error,
  loading,
  handleSubmit,
  handleChange,
  stars,
}) => {
  const currentUser = store.getState().currentUser;
  return (
    <div>
      { currentUser ?
        <AddReview
          content={content}
          error={error}
          loading={loading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          stars={stars}
        /> : null
      }
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default Reviews;
