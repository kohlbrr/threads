const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../app');
const { Product, User, Design, Cartcontents } = require('../../db/models');

const agent = session(app);


describe('Cart Api', () => {
  beforeEach(() => Cartcontents.sync({ force: true })
    .then(() => User.sync({ force: true }))
    .then(() => Product.sync({ force: true }))
    .then(() => Design.sync({ force: true })));
  beforeEach(() => Design.create({
    name: 'T-shirt',
    price: 60,
    sex: 'M',
  })
  .then(design => Product.create({
    size: 'M',
    color: 'Red',
    designId: design.id,
    stock: 5,
  }))
  .then(() => User.create({
    email: 'guille@guille.com',
    password: 'pass123',
  }))
  .then(user => Cartcontents.create({
    userId: user.id,
    productId: 1,
    quantity: 3,
  }))
  .then(() => Product.create({
    size: 'L',
    color: 'Black',
    designId: 1,
    stock: 3,
  })));
  describe('GET /api/cart', () => {
    it('should return a 403 if it is not logged in', () =>
       agent.get('/api/cart').expect(403));
    describe('Logged User', () => {
      let loggedUser;
      beforeEach(() => {
        loggedUser = session(app);
        return loggedUser.post('/auth/login')
        .send({ email: 'guille@guille.com', password: 'pass123' });
      });
      it('should return a 200', () =>
        loggedUser.get('/api/cart').expect(200));
      it('should return an array of products', () =>
        loggedUser.get('/api/cart').expect((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].color).to.equal('Red');
        }));
      it('should include the quantity information', () =>
        loggedUser.get('/api/cart').expect((res) => {
          expect(res.body[0].quantity).to.equal(3);
        }));
      it('should include the design information', () =>
        loggedUser.get('/api/cart').expect((res) => {
          expect(res.body[0].name).to.equal('T-shirt');
        }));
    });
  });
  describe('POST /api/cart/:productId', () => {
    const cart = { quantity: 2 };
    it('should return a 403 if it is not logged in', () =>
       agent.post('/api/cart/2').send(cart).expect(403));
    describe('Logged User', () => {
      let loggedUser;
      beforeEach(() => {
        loggedUser = session(app);
        return loggedUser.post('/auth/login')
        .send({ email: 'guille@guille.com', password: 'pass123' });
      });
      it('should return a 201', () =>
        loggedUser.post('/api/cart/2').send(cart).expect(201));
      it('should add the column to cartContents', () =>
        loggedUser.post('/api/cart/2').send(cart).then(() =>
          Cartcontents.findOne({
            where: {
              productId: 2,
            },
          })
          .then((content) => {
            expect(content).to.be.an('object');
          })));
      it('should have the quantity property', () =>
        loggedUser.post('/api/cart/2').send(cart).then(() =>
          Cartcontents.findOne({
            where: {
              productId: 2,
            },
          })
          .then((content) => {
            expect(content.quantity).to.equal(2);
          })));
      it('should return 404 if we try to add more quantity than possible', () =>
          loggedUser.post('/api/cart/2').send({ quantity: 200 }).expect(404));
      it('should return 404 if not a valid id', () =>
          loggedUser.post('/api/cart/sdfjhfl').send({ quantity: 2 }).expect(404));
      it('should return 404 if product does not exist', () =>
          loggedUser.post('/api/cart/32').send({ quantity: 2 }).expect(404));
    });
  });
  describe('PUT /api/cart/:productId', () => {
    const cart = { quantity: 2 };
    it('should return a 403 if it is not logged in', () =>
       agent.put('/api/cart/1').send(cart).expect(403));
    describe('Logged User', () => {
      let loggedUser;
      beforeEach(() => {
        loggedUser = session(app);
        return loggedUser.post('/auth/login')
        .send({ email: 'guille@guille.com', password: 'pass123' });
      });
      it('should return a 201', () =>
        loggedUser.put('/api/cart/1').send(cart).expect(201));
      it('should have the quantity property modified', () =>
        loggedUser.put('/api/cart/1').send(cart).then(() =>
          Cartcontents.findOne({
            where: {
              productId: 1,
            },
          })
          .then((content) => {
            expect(content.quantity).to.equal(2);
          })));
      it('should return 404 if we try to add more quantity than possible', () =>
          loggedUser.post('/api/cart/1').send({ quantity: 200 }).expect(404));
      it('should return 404 if not a valid id', () =>
          loggedUser.post('/api/cart/sdfjhfl').send({ quantity: 2 }).expect(404));
      it('should return 404 if product does not exist', () =>
          loggedUser.post('/api/cart/32').send({ quantity: 2 }).expect(404));
    });
  });
});
