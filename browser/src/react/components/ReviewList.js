import React from 'react';
import ReviewItem from './ReviewItem';


const ReviewList = ({ reviews }) => (
  <div>
    {reviews && reviews.map(review => (
      <ReviewItem review={review} />
    ))}
  </div>
);

export default ReviewList;
