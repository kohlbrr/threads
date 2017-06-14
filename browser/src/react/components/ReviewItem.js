import React from 'react';

function createStars(num) {
  let stars = [];
  while (num) {
    stars.push(<span key={num} style={{ fontSize: 20, color: '#e8d90b' }}>&#9733;</span>)
    num -= 1;
  }
  return stars;
}
const ReviewItem = ({ review }) => (
  <div className="thumbnail">
    <h4>{review.user.name}</h4>
    <p>{review.content}</p>
    <p>{createStars(review.stars)}</p>
  </div>
);

export default ReviewItem;

