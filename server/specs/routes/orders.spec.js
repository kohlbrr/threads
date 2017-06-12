const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../app');
const { Product, User, Design, Order, OrderProducts } = require('../../db/models');

const agent = session(app);

describe('Orders API', () => {
  
  // Products
  // Users
  // To have Orders
  // That have OrderProducts

  beforeEach(() => OrderProducts.sync({ force: true })
  .then(() => Order.sync({ force: true }))
  .then(() => User.sync({ force: true }))
  .then(() => Product.sync({ force: true }))
  .then(() => Design.sync({ force: true })));
 
  beforeEach(() => Design.create({
    name: 'Cold Geoff',
    price: 14.00,
    sex: 'F'
  })
  .then(design => Product.create({
    size: 'S',
    color: 'Blue',
    designId: design.id,
    stock: 30
  })
  .then(() => User.create({
    email: 'thunk@krunk.dunk',
    password: '123456',
    isAdmin: true
  }))
  .then(() => User.create({
    email: 'normie@bland.toast',
    password: 'iWishIWasAnAdmin',
    isAdmin: false
  }))
  .then(user => Order.create({
    status: 'Pending',
    timestamp: 0,
    userId: user.id
  }))
  .then(order => OrderProducts.create({
    orderId: order.id,
    productId: 1,
    price: 19.95,
    quantity: 2
  }))));

  describe('GET /api/orders', () => {
    it('should 403 if there is no user or user is not an admin', () => {
      agent.get('/api/orders').expect(403);
      let loggedInUser = session(app);
      loggedInUser.post('/auth/login')
      .send({ email: 'normie@bland.toast', password: 'iWishIWasAnAdmin' });
      loggedInUser.get('/api/orders').expect(403);
    });
    describe('Admin', () => {
      let loggedInAdmin;
      beforeEach(() => {
        loggedInAdmin = session(app);
        return loggedInAdmin.post('/auth/login')
        .send({ email: 'thunk@krunk.dunk', password: '123456' });
      });
      it('should return a 200', () => loggedInAdmin.get('/api/orders').expect(200));
      it('should return an array of orders', () => {
        loggedInAdmin.get('/api/orders').expect(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].color).to.equal('Blue');
        });
      });
    });
  });

  // Create an order || USER

  // Update order status || ADMIN
  describe('PUT /api/orders/:id', () => {
    it('should 403 if there is no user or user is not an admin', () => {
      agent.put('/api/orders/1').expect(403);
      let loggedInUser = session(app);
      loggedInUser.post('/auth/login')
      .send({ email: 'normie@bland.toast', password: 'iWishIWasAnAdmin' });
      loggedInUser.put('/api/orders/1').expect(403);
    });
    describe('Admin', () => {
      let loggedInAdmin;
      beforeEach(() => {
        loggedInAdmin = session(app);
        return loggedInAdmin.post('/auth/login')
        .send({ email: 'thunk@krunk.dunk', password: '123456' });
      });
      it('should return a 201', () => loggedInAdmin.put('/api/orders/1').send({ status: 'Shipped' }).expect(201));
      it('should return the updated order', () => {
        loggedInAdmin.put('/api/orders/1').send({ status: 'Canceled'}).expect(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('Canceled');
        });
      });
    });
  });

  // Return one order || USER
  describe('GET /api/orders/:id', () => {
    it('should 403 if there is no user', () => agent.get('/api/orders/1').expect(403));
    describe('User', () => {
      let loggedInUser;
      beforeEach(() => {
        loggedInUser = session(app);
        return loggedInUser.post('/auth/login')
        .send({ email: 'normie@bland.toast', password: 'iWishIWasAnAdmin' });
      });
    });
  });

  // Return all order items || USER
  

});
