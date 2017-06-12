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
  .then(Order.sync({ force: true }))
  .then(() => User.sync({ force: true }))
  .then(() => Product.sync({ force: true }))
  .then(() => Design.sync({ force: true })));
 
  console.log('DEAD LOCK')

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
    });
    describe('Admin', () => {
      let loggedInUser;
      beforeEach(() => {
        loggedInUser = session(app);
        return loggedInUser.post('/auth/login')
        .send({ email: 'think@krunk.dunk', password: '123456' });
      });
      it('should return a 200', () => loggedInUser.get('/api/orders').expect(200));
      it('should return an array of orders', () => {
        loggedInUser.get('/api/orders').expect(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].color).to.equal('Blue');
        });
      });
    });
  });

  // Create an order || USER
  // Update order status || ADMIN
  // Return one order || USER
  // Return all order items || USER

});
