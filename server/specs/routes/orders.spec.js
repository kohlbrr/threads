const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const { Order, User } = require('../../db/models');

const agent = supertest.agent(app);

describe('Orders API routes', () => {
  before(() => User.sync({ force: true })
  .then(() => Order.sync({ force: true })));

  before(() => User.create({
    name: 'Theodore Notaperson',
    email: 'wat@dis.dat',
    password: 'omgwtfbbq'
  })
  .then(() => Order.create({
    status: 'Shipped',
    timestamp: 0,
    userId: 1
  }))
  .catch(console.error)
  );

  describe('Get all orders', () => {
    it('responds with a 200', () => agent.get('/api/orders').expect(200));
    it('responds with an array of orders', () => {
      agent.get('/api/orders').expect(res => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].status).to.equal('Shipped');
      });
    });
  });

  describe('Create an order', () => {
    const order = {
      status: 'Pending',
      timestamp: 1000000,
      userId: 1
    };
    it('should return a 201', () => agent.post('/api/orders').send(order).expect(201));
    it('should create (and return) a new order', () => {
      const req = agent.post('/api/orders').send(order);
      return req.expect(res => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('Pending');
      });
    });
    it('should 400 if nothing is created', () => agent.post('/api/orders').expect(400));
  });

  describe('Update an order', () => {
    it('should return a 201', () => agent.put('/api/orders/1').send({ status: 'Canceled' }).expect(201));
    it('should update (and return) an existing order', () => {
      const req = agent.put('/api/orders/1').send({ status: 'Canceled' });
      return req.expect(res => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(1);
        expect(res.body.status).to.equal('Canceled');
      });
    });
    it('should 400 if nothing is updated', () => agent.put('/api/orders/999999').expect(400));
  });

  describe('Return a single order', () => {
    it('should return a 200', () => agent.get('/api/orders/1').expect(200));
    it('should return a single order', () => {
      agent.get('/api/orders/1').expect(res => {
        //Did not write test here yet
      });
    });
  });
});

