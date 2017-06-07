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
      price: 1900,
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
      price: 1900,
    };
    it('should throw a 401 error if it is not login', () =>
       agent.post('/api/designs').send(design).expect(401));
    it('respond with a 401 if it is login but is not an Admin', () =>
       agent.post('/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then((res) => {
        const req = agent.post('/api/designs');
        req.cookies = res.headers['set-cookies'];
        return req.send(design).expect(401);
      }));
    describe('Admin User', () => {
      let cookies;
      before(() =>
        agent.post('/login')
        .send({ email: 'admin@admin.com', password: 'pass123' })
        .then((res) => {
          cookies = res.headers['set-cookies'];
        }));
      it('should respond with a 400 if not a valid design', () => {
        const req = agent.post('/api/designs', { name: 'T-Shirt' });
        req.cookies = cookies;
        return req.expect(201);
      });
      it('should respond with a 201', () => {
        const req = agent.post('/api/designs', design);
        req.cookies = cookies;
        return req.expect(201);
      });
      it('should respond with the created product', () => {
        const req = agent.post('/api/designs', design);
        req.cookies = cookies;
        return req.expect((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal('T-Shirt');
          expect(res.body).to.have.a.property('id');
        });
      });
    });
  });
  describe('PUT /api/designs/:id', () => {
    let route;
    let id;
    const design = {
      name: 'T-Shirt',
      sex: 'M',
      price: 1500,
    };
    beforeEach(() => Design.create({
      name: 'T-Shirt',
      sex: 'M',
      price: 1900,
    })
    .then((newDesign) => {
      id = newDesign.id;
      route = `/api/designs/${id}`;
    }));
    it('should throw a 401 error if it is not login', () =>
       agent.put(route).send(design).expect(401));
    it('respond with a 401 if it is login but is not an Admin', () =>
       agent.post('/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then((res) => {
        const req = agent.post(route);
        req.cookies = res.headers['set-cookies'];
        return req.send(design).expect(401);
      }));
    describe('Admin User', () => {
      let cookies;
      before(() =>
        agent.post('/login')
        .send({ email: 'admin@admin.com', password: 'pass123' })
        .then((res) => {
          cookies = res.headers['set-cookies'];
        }));
      it('responds with a 404 if product does not exist', () => {
        const req = agent.put('/api/designs/5');
        req.cookies = cookies;
        return req.expect(404);
      });
      it('responds with a 404 if not a valid id', () => {
        const req = agent.put('/api/designs/lsks');
        req.cookies = cookies;
        return req.expect(404);
      });
      it('should respond with a 200', () => {
        const req = agent.post(route, design);
        req.cookies = cookies;
        return req.expect(200);
      });
      it('should respond with the updated product', () => {
        const req = agent.post('/api/designs', design);
        req.cookies = cookies;
        return req.expect((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.price).to.equal(1500);
          expect(res.body.id).to.equal(id);
        });
      });
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
    it('respond with a 401 if it is login but is not an Admin', () =>
       agent.post('/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then((res) => {
        const req = agent.delete(route);
        req.cookies = res.headers['set-cookies'];
        return req.expect(401);
      }));
    describe('Admin User', () => {
      let cookies;
      before(() =>
        agent.post('/login')
        .send({ email: 'admin@admin.com', password: 'pass123' })
        .then((res) => {
          cookies = res.headers['set-cookies'];
        }));
      it('responds with a 404 if product does not exist', () => {
        const req = agent.delete('/api/designs/5');
        req.cookies = cookies;
        return req.expect(404);
      });
      it('responds with a 404 if not a valid id', () => {
        const req = agent.delete('/api/designs/lsks');
        req.cookies = cookies;
        return req.expect(404);
      });
      it('should respond with a 204', () => {
        const req = agent.delete(route);
        req.cookies = cookies;
        return req.expect(204);
      });
      it('should delete also all the products associated to the design', () => {
        const req = agent.delete(route);
        req.cookies = cookies;
        return req.expect(() =>
          Product.findAll({ where: { designId: id } })
          .then(products => expect(products).to.have.lengthOf(0)));
      });
    });
  });
});
