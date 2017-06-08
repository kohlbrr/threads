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

  /*
  describe('Get /api/designs/:id', () => {
    it('responds with 200', () => agent.get('/api/designs/1').expect(200));
    it('responds with a 404 if product does not exist', () =>
       agent.get('/api/designs/5').expect(404));
    it('responds with a 404 if not a valid id', () =>
       agent.get('/api/designs/lsks').expect(404));
    it('responds with a specific design', () =>
       agent.get('/api/designs/1').expect(res =>
        expect(res.body.name).to.equal('T-Shirt')));
    it('the design has a products property with an array of products', () =>
      agent.get('/api/designs/1').expect((res) => {
        expect(res.body.products).to.be.an('array');
        expect(res.body.products[0].color).to.equal('Red');
      }));
  });
  */
});