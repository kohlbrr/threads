import React from 'react';
import ReviewItem from './ReviewItem';


const ReviewList = ({ reviews }) => (
  <div>
    {reviews && reviews.map(review => (
      <ReviewItem key={review.id} review={review} />
    ))}
  </div>
);

export default ReviewList;
