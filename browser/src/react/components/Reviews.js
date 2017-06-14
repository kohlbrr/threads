import React from 'react';
import ReviewList from './ReviewList';
import store from '../store';
//import { addReview } from '../action-creators/reviews';

const Reviews = ({ reviews }) => {
  const currentUser = store.getState().currentUser;
  return (
    <div>
      { currentUser ?
          <form>
            <fieldset>
              <label>New Review</label>
              <input/>
            </fieldset>
          </form> : null
      }
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default Reviews;
