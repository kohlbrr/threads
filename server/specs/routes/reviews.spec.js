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
      it('should 400 if nothing is created', () => loggedUser.post('/api/designs/1/reviews').expect(400));
    });
  });

  describe('Update an existing review', () => {
    it('should return a 201', () =>
      agent.put('/api/reviews/1').send({ content: "I've been had!" }).expect(201)
    );
    it('should update (and return) an existing review', () => {
      const req = agent.put('/api/reviews/1').send({content: "I've been had!"});
      return req.expect(res => {
        expect(res.body).to.be.an('object');
        expect(res.body.content).to.equal("I've been had!");
      });
    });
    it('should 400 if nothing is updated', () => agent.put('/api/reviews/99999').expect(400));
  });

  describe('Delete a review', () => {
    it('responds with 204', () => agent.delete('/api/reviews/1').expect(204));
    it('deletes a review', () => {
      agent.get('/api/reviews/1').expect(res => {
        expect(res.body).to.have.a.property('id');
      });
      agent.delete('/api/reviews/1');
      agent.get('/api/reviews/1').expect(404);
    });
    it('should 404 if nothing is deleted', () => agent.delete('/api/reviews/99999').expect(404));
  });

});
