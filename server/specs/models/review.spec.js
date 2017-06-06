const { Review } = require('../../db/models');
const { expect } = require('chai');

describe('Review Model', () => {
  beforeEach(() => Review.sync({ force: true }));
  describe('Validators', () => {
    describe('stars', () => {
      it('should throw an error if not an Integer', (done) => {
        Review.create({
          stars: 'hello',
        })
        .then(() => done('It shouldn\'t be valid!'))
        .catch(() => done());
      });
      it('should be a value greater than 1', (done) => {
        Review.create({
          stars: 0,
        })
        .then(() => done('It shouldn\'t be valid!'))
        .catch(() => done());
      });
      it('should be a value less than 5', (done) => {
        Review.create({
          stars: 6,
        })
        .then(() => done('It shouldn\'t be valid!'))
        .catch(() => done());
      });
    });
  });
});
