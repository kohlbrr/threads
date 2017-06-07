const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const { Design, Product, User } = require('../../db/models');

const agent = supertest.agent(app);

describe('Design API routes', () => {
  before(() => User.bulkCreate([
    {
      email: 'admin@admin.com',
      password: 'pass123',
      isAdmin: true,
    }, {
      email: 'notadmin@admin.com',
      password: 'pass123',
      isAdmin: false,
    },
  ]));
  beforeEach(() => Design.sync({ force: true })
    .then(() => Product.sync({ force: true })));


  describe('GET /api/designs', () => {
    beforeEach(() => Design.create({
      name: 'T-Shirt',
      sex: 'M',
      price: 19.00,
    })
    .then(design => Product.create({
      size: 'M',
      color: 'Red',
      stock: 4,
      imageUrl: 'image',
      designId: design.id,
    })));
    it('responds with 200', () => agent.get('/api/designs').expect(200));
    it('responds with an Array of Designs', () =>
        agent.get('/api/designs').expect((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal('T-Shirt');
        }));
  });
  describe('GET /api/designs/:id', () => {
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
  describe('POST /api/designs', () => {
    const design = {
      name: 'T-Shirt',
      sex: 'M',
      price: 19.00,
    };
    it('should throw a 401 error if it is not login', () =>
       agent.post('/api/designs').send(design).expect(401));
    it('respond with a 401 if it is login but is not an Admin', () => {
      const notAdmin = agent.post('/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then(() => {
        notAdmin.post('/api/designs').send(design).expect(401);
      });
    });
    describe('Admin User', () => {
      let adminUser;
      before(() => {
        adminUser = agent.post('/login')
        .send({ email: 'admin@admin.com', password: 'pass123' });
      });
      it('should respond with a 400 if not a valid design', () =>
        adminUser.then(() =>
          adminUser.post('/api/designs').send({ name: 'T-Shirt' }).expect(400)));
      it('should respond with a 201', () =>
        adminUser.then(() =>
          adminUser.post('/api/designs').send(design).expect(201)));
      it('should respond with the created product', () =>
        adminUser.then(() =>
          adminUser.post('/api/designs').send(design)
          .expect((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.name).to.equal('T-Shirt');
            expect(res.body).to.have.a.property('id');
          })));
    });
  });
  describe('PUT /api/designs/:id', () => {
    let route;
    let id;
    const design = {
      name: 'T-Shirt',
      sex: 'M',
      price: 15.00,
    };
    beforeEach(() => Design.create({
      name: 'T-Shirt',
      sex: 'M',
      price: 19.00,
    })
    .then((newDesign) => {
      id = newDesign.id;
      route = `/api/designs/${id}`;
    }));
    it('should throw a 401 error if it is not login', () =>
       agent.put(route).send(design).expect(401));
    it('respond with a 401 if it is login but is not an Admin', () => {
      const notAdmin = agent.post('/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then(() => {
        notAdmin.put(route).send(design).expect(401);
      });
    });
    describe('Admin User', () => {
      let adminUser;
      before(() => {
        adminUser = agent.post('/login')
        .send({ email: 'admin@admin.com', password: 'pass123' });
      });
      it('responds with a 404 if product does not exist', () =>
        adminUser.then(() =>
          adminUser.put('/api/designs/5').send({ name: 'T-Shirt' }).expect(404)));
      it('responds with a 404 if not a valid id', () =>
        adminUser.then(() =>
          adminUser.put('/api/designs/dsk').send(design).expect(404)));
      it('should respond with a 200', () =>
        adminUser.then(() =>
          adminUser.put(route).send(design)
          .expect(200)));
      it('should respond with the updated product', () =>
        adminUser.then(() =>
          adminUser.put(route).send(design)
          .expect((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.price).to.equal(15.00);
            expect(res.body.id).to.equal(id);
          })));
    });
  });
  describe('DELETE /api/designs/:id', () => {
    let route;
    let id;
    beforeEach(() => Design.create({
      name: 'T-Shirt',
      sex: 'M',
      price: 1900,
    })
    .then((newDesign) => {
      id = newDesign.id;
      route = `/api/designs/${id}`;
    })
    .then(() => Product.create({
      size: 'M',
      color: 'Red',
      stock: 4,
      imageUrl: 'image',
      designId: id,
    })));
    it('should throw a 401 error if it is not login', () =>
       agent.delete(route).expect(401));
    it('respond with a 401 if it is login but is not an Admin', () => {
      const notAdmin = agent.post('/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then(() => {
        notAdmin.delete(route).expect(401);
      });
    });
    describe('Admin User', () => {
      let adminUser;
      before(() => {
        adminUser = agent.post('/login')
        .send({ email: 'admin@admin.com', password: 'pass123' });
      });
      it('responds with a 404 if product does not exist', () =>
        adminUser.then(() =>
          adminUser.delete('/api/designs/5').expect(404)));
      it('responds with a 404 if not a valid id', () =>
        adminUser.then(() =>
          adminUser.delete('/api/designs/dsk').expect(404)));
      it('should respond with a 204', () =>
        adminUser.then(() =>
          adminUser.delete(route).expect(204)));
      it('should delete also all the products associated to the design', () =>
        adminUser.then(() =>
          adminUser.delete(route)
          .then(() =>
            Product.findAll({ where: { designId: id } })
            .then(products => expect(products).to.have.lengthOf(0)))));
    });
  });
});
