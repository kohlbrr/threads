const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const { Design, Product } = require('../../db/models');

const agent = supertest.agent(app);

describe('Design API routes', () => {
  before(() => Design.sync({ force: true })
    .then(() => Product.sync({ force: true })));

  before(() => Design.create({
    name: 'T-Shirt',
    sex: 'M',
    price: 1900,
  })
  .then(design => Product.create({
    size: 'M',
    color: 'Red',
    stock: 4,
    imageUrl: 'image',
    designId: design.id,
  })));
  describe('Get /api/designs', () => {
    it('responds with 200', () => agent.get('/api/designs').expect(200));
    it('responds with an Array of Designs', () =>
        agent.get('/api/designs').expect((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal('T-Shirt');
        }));
  });
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
});
