const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../app');
const { Design, Review, User } = require('../../db/models');

const agent = session(app);

describe('Review API routes', () => {
  beforeEach(() => Design.sync({ force: true })
    .then(() => User.sync({ force: true }))
    .then(() => Review.sync({ force: true })));

  beforeEach(() => Design.create({
    name: 'T-Shirt',
    sex: 'M',
    price: 1900,
  })
  .then(() => User.create({
    name: 'Fakey McFakerson',
    email: 'i@dont.exist',
    password: 'pass123',
  }))
  .then(user => Review.create({
    content: 'This shirt sucks!',
    stars: 1,
    userId: user.id,
    designId: 1,
  }))
  .then(() => Review.create({
    content: 'This shirt sucks!',
    stars: 1,
    designId: 1,
  })));

  describe('POST /api/designs/:id/reviews', () => {
    const review = {
      stars: 5,
      content: 'This shirt RULEZ!',
    };
    it('should return a 401 if it is not logged In', () =>
      agent.post('/api/designs/1/reviews').send(review).expect(403));
    describe('Logged in user', () => {
      let loggedUser;
      beforeEach(() => {
        loggedUser = session(app);
        return loggedUser.post('/auth/login')
        .send({ email: 'i@dont.exist', password: 'pass123' });
      });
      it('should return a 201', () =>
        loggedUser.post('/api/designs/1/reviews').send(review).expect(201));
      it('should create (and return) a new review', () => {
        loggedUser.post('/api/designs/1/reviews')
        .send(review)
        .expect((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.userId).to.equal(1);
          expect(res.body.designId).to.equal(1);
          expect(res.body).to.have.a.property('id');
        });
      });
      it('should 400 if nothing is created', () => loggedUser.post('/api/designs/1/reviews/').expect(400));
    });
  });

  describe('PUT /api/designs/:id/reviews/:reviewId', () => {
    const review = {
      stars: 5,
    };
    it('should return a 403 if it is not logged In', () =>
      agent.put('/api/designs/1/reviews/1').send(review).expect(403));
    describe('Logged in user', () => {
      let loggedUser;
      beforeEach(() => {
        loggedUser = session(app);
        return loggedUser.post('/auth/login')
        .send({ email: 'i@dont.exist', password: 'pass123' });
      });
      it('should return a 401 if user is not owner of the review', () => {
        loggedUser.put('/api/designs/1/reviews/2').send(review).expect(401);
      });
      it('should return a 201', () =>
        loggedUser.put('/api/designs/1/reviews/1').send(review).expect(201));
      it('should update (and return) the updated review', () => {
        loggedUser.put('/api/designs/1/reviews/1')
        .send(review)
        .expect((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.userId).to.equal(1);
          expect(res.body.designId).to.equal(1);
          expect(res.body.stars).to.equal(5);
          expect(res.body).to.have.a.property('id');
        });
      });
      it('should 404 if there is no review found', () => loggedUser.put('/api/designs/1/reviews/5').expect(404));
      it('should 404 if not valid id', () => loggedUser.put('/api/designs/1/reviews/5').expect(404));
    });
  });

  describe('DELETE /api/designs/:id/reviews/:reviewId', () => {
    it('should return a 403 if it is not logged In', () =>
      agent.delete('/api/designs/1/reviews/1').expect(403));
    describe('Logged in user', () => {
      let loggedUser;
      beforeEach(() => {
        loggedUser = session(app);
        return loggedUser.post('/auth/login')
        .send({ email: 'i@dont.exist', password: 'pass123' });
      });
      it('should return a 401 if user is not owner of the review', () => {
        loggedUser.delete('/api/designs/1/reviews/2').expect(401);
      });
      it('should return a 203', () =>
        loggedUser.delete('/api/designs/1/reviews/1').expect(203));
      it('should 404 if there is no review found', () => loggedUser.delete('/api/designs/1/reviews/5').expect(404));
      it('should 404 if not valid id', () => loggedUser.delete('/api/designs/1/reviews/5').expect(404));
    });
  });
});
