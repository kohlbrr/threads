const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const { Design, Review, User } = require('../../db/models');

const agent = supertest.agent(app);

describe('Review API routes', () => {
  before(() => Design.sync({ force: true })
    .then(() => User.sync({ force: true }))
    .then(() => Review.sync({ force: true })));

  before(() => Design.create({
    name: 'T-Shirt',
    sex: 'M',
    price: 1900,
  })
  .then(() => User.create({
    name: 'Fakey McFakerson',
    email: 'i@dont.exist',
    password: 'fw5initou38w4o'
  }))
  .then(user => {
    return Review.create({
      content: 'This shirt sucks!',
      stars: 1,
      userId: user.id,
      designId: 1
    });
  })
  .catch(console.error)
  );

  describe('Get all reviews for a design', () => {
    it('responds with 200', () => agent.get('/api/reviews/1').expect(200));
    it('responds with an array of reviews', () =>
        agent.get('/api/reviews/1').expect((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].designId).to.be.equal(1);
        }));
  });

  describe('Get all reviews for a user', () => {
    it('responds with 200', () => agent.get('/api/reviews/user/1').expect(200));
    it('responds with an array of reviews', () =>
        agent.get('/api/reviews/1').expect((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].userId).to.be.equal(1);
        }));
  });

  describe('Create review for a design as user', () => {
    const review = {
      stars: 5,
      content: 'This shirt RULEZ!',
      userId: 1,
      designId: 1
    };
    it('should return a 201', () =>
      agent.post('/api/reviews').send(review).expect(201)
    );
    it('should create (and return) a new review', () => {
      const req = agent.post('/api/reviews').send(review);
      return req.expect(res => {
        expect(res.body).to.be.an('object');
        expect(res.body.userId).to.equal(1);
        expect(res.body.designId).to.equal(1);
        expect(res.body).to.have.a.property('id');
      });
    });
  });

  describe('Update an existing review', () => {
    it('should return a 201', () => 
      agent.put('/api/reviews/1').send({content: "I've been had!"}).expect(201)
    );
    it('should update (and return) an existing review', () => {
      const req = agent.put('/api/reviews/1').send({content: "I've been had!"});
      return req.expect(res => {
        expect(res.body).to.be.an('object');
        expect(res.body.content).to.equal("I've been had!");
      });
    });
  });

  describe('Delete a review', () => {
    it('responds with 204', () => agent.delete('/api/reviews/1').expect(204));
    it('deletes a review', () => {
      agent.get('/api/reviews/1').expect(res => {
        expect(res.body).to.have.a.property('id');
      })
      agent.delete('/api/reviews/1');
    });
  });

});
