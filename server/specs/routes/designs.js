const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const { Design, Product } = require('../../db/models');

const agent = supertest.agent(app);

describe('Design API routes', () => {
  before(() => Design.sync({ force: true })
    .then(() => Product.sync({ force: true })));

  beforeEach(() => Design.truncate()
             .then(() => Product.trucate()));
  beforeEach(() => Design.create({
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
    it('responds with an Array of Designs', () => {
      agent.get('/api/designs').expect((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].name).to.be.equal('T-Shirt');
      });
    });
  });
});
