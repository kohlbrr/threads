const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../app');
const { Design, Product, User, Review } = require('../../db/models');

const agent = session(app);

describe('Design API routes', () => {
  beforeEach(() => Design.sync({ force: true })
    .then(() => Product.sync({ force: true }))
    .then(() => User.sync({ force: true })));
  beforeEach(() => User.create(
    {
      email: 'admin@admin.com',
      password: 'pass123',
      isAdmin: true,
    }).then(User.create({
      email: 'notadmin@admin.com',
      password: 'pass123',
      isAdmin: false,
    })));

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
    beforeEach(() => Design.create({
      name: 'T-Shirt',
      sex: 'M',
      price: 19.00,
    })
    .then(design => Promise.all([
      Product.create({
        size: 'M',
        color: 'Red',
        stock: 4,
        imageUrl: 'image',
        designId: design.id,
      }),
      Review.create({
        content: 'This shirt sucks!',
        stars: 1,
        userId: 1,
        designId: design.id,
      }),
    ])));
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
    it('the design has a reviews property with an array of reviews', () =>
      agent.get('/api/designs/1').expect((res) => {
        expect(res.body.reviews).to.be.an('array');
        expect(res.body.reviews[0].stars).to.equal(1);
      }));
    it('the reviews inside reviews has the user information', () =>
       agent.get('/api/designs/1').expect((res) => {
         expect(res.body.reviews[0].user).to.be.an('object');
         expect(res.body.reviews[0].user.name).to.equal('Guest');
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
      const notAdmin = session(app);
      return notAdmin.post('/auth/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then(() =>
        notAdmin.post('/api/designs').send(design).expect(401));
    });
    describe('Admin User', () => {
      let adminUser;
      beforeEach(() => {
        adminUser = session(app);
        return adminUser
        .post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' });
      });
      it('should respond with a 400 if not a valid design', () =>
        adminUser.post('/api/designs').send({ name: 'T-Shirt' }).expect(400));
      it('should respond with a 201', () =>
        adminUser.post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' })
        .then(() =>
          adminUser.post('/api/designs').send(design).expect(201)));
      it('should respond with the created product', () =>
        adminUser.post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' })
        .then(() =>
          adminUser.post('/api/designs').send(design)
          .expect((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.name).to.equal('T-Shirt');
            expect(res.body).to.have.a.property('id');
          })));
    });
  });
  describe('PUT /api/designs/:id', () => {
    const design = {
      name: 'T-Shirt',
      sex: 'M',
      price: 15.00,
    };
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
    }));
    it('should throw a 401 error if it is not login', () =>
       agent.put(route).send(design).expect(401));
    it('respond with a 401 if it is login but is not an Admin', () => {
      const notAdmin = session(app);
      return notAdmin.post('/auth/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then(() => {
        notAdmin.put(route).send(design).expect(401);
      });
    });
    describe('Admin User', () => {
      let adminUser;
      beforeEach(() => {
        adminUser = session(app);
        return adminUser.post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' });
      });
      it('responds with a 404 if product does not exist', () =>
          adminUser.put('/api/designs/5').send({ name: 'T-Shirt' }).expect(404));
      it('responds with a 404 if not a valid id', () =>
          adminUser.put('/api/designs/dsk').send(design).expect(404));
      it('should respond with a 201', () =>
          adminUser.put(route).send(design)
          .expect(201));
      it('should respond with the updated product', () =>
          adminUser.put(route).send(design)
          .expect((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.price).to.equal(15);
            expect(res.body.id).to.equal(id);
          }));
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
      const notAdmin = session(app);
      return notAdmin.post('/auth/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then(() => {
        notAdmin.delete(route).expect(401);
      });
    });
    describe('Admin User', () => {
      let adminUser;
      beforeEach(() => {
        adminUser = session(app);
        return adminUser.post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' });
      });
      it('responds with a 404 if product does not exist', () =>
        adminUser.delete('/api/designs/5').expect(404));
      it('responds with a 404 if not a valid id', () =>
        adminUser.delete('/api/designs/dsk').expect(404));
      it('should respond with a 204', () =>
        adminUser.delete(route).expect(204));
      it('should delete also all the products associated to the design', () =>
        adminUser.delete(route)
        .then(() =>
          Product.findAll({ where: { designId: id } })
          .then(products => expect(products).to.have.lengthOf(0))));
      it('should delete also all the reviews associated to the design', () =>
        adminUser.delete(route)
        .then(() =>
          Review.findAll({ where: { designId: id } })
          .then(reviews => expect(reviews).to.have.lengthOf(0))));
    });
  });
});
