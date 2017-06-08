const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../app');
const { Clothing, Category, User } = require('../../db/models');

const agent = session(app);

describe('Clothing API routes', () => {
  beforeEach(() => Clothing.sync({ force: true })
    .then(() => Category.sync({ force: true }))
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

  describe('GET /api/clothings', () => {
    beforeEach(() => Clothing.create({
      name: 'T-Shirt',
    })
    .then(clothing => Category.create({
      name: 'Polo',
      clothingId: clothing.id,
    })));
    it('responds with 200', () => agent.get('/api/clothings').expect(200));
    it('responds with an Array of clothings', () =>
        agent.get('/api/clothings').expect((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal('T-Shirt');
        }));
  });
  describe('GET /api/clothings/:id', () => {
    beforeEach(() => Clothing.create({
      name: 'T-Shirt',
    })
    .then(clothing => Category.create({
      name: 'Polo',
      clothingId: clothing.id,
    })));
    it('responds with 200', () => agent.get('/api/clothings/1').expect(200));
    it('responds with a 404 if clothing does not exist', () =>
       agent.get('/api/clothings/5').expect(404));
    it('responds with a 404 if not a valid id', () =>
       agent.get('/api/clothings/lsks').expect(404));
    it('responds with a specific clothing', () =>
       agent.get('/api/clothings/1').expect(res =>
        expect(res.body.name).to.equal('T-Shirt')));
    it('the category has a designs property with an array of categories', () =>
      agent.get('/api/clothings/1').expect((res) => {
        expect(res.body.categories).to.be.an('array');
        expect(res.body.categories[0].name).to.equal('Polo');
      }));
  });
  describe('POST /api/clothings', () => {
    const clothing = {
      name: 'T-Shirt',
    };
    it('should throw a 401 error if it is not login', () =>
       agent.post('/api/clothings').send(clothing).expect(401));
    it('respond with a 401 if it is login but is not an Admin', () => {
      const notAdmin = session(app);
      return notAdmin.post('/auth/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then(() =>
        notAdmin.post('/api/clothings').send(clothing).expect(401));
    });
    describe('Admin User', () => {
      let adminUser;
      beforeEach(() => {
        adminUser = session(app);
        return adminUser
        .post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' });
      });
      it('should respond with a 400 if not a valid clothing', () =>
        adminUser.post('/api/clothings').send({ cake: 'chocolate' }).expect(400));
      it('should respond with a 201', () =>
        adminUser.post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' })
        .then(() =>
          adminUser.post('/api/clothings').send(clothing).expect(201)));
      it('should respond with the created product', () =>
        adminUser.post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' })
        .then(() =>
          adminUser.post('/api/clothings').send(clothing)
          .expect((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.name).to.equal('T-Shirt');
            expect(res.body).to.have.a.property('id');
          })));
    });
  });
  describe('PUT /api/clothings/:id', () => {
    const clothing = {
      name: 'Pants',
    };
    let route;
    let id;
    beforeEach(() => Clothing.create({
      name: 'T-Shirt',
    })
    .then((newDesign) => {
      id = newDesign.id;
      route = `/api/clothings/${id}`;
    }));
    it('should throw a 401 error if it is not login', () =>
       agent.put(route).send(clothing).expect(401));
    it('respond with a 401 if it is login but is not an Admin', () => {
      const notAdmin = session(app);
      return notAdmin.post('/auth/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then(() => {
        notAdmin.put(route).send(clothing).expect(401);
      });
    });
    describe('Admin User', () => {
      let adminUser;
      beforeEach(() => {
        adminUser = session(app);
        return adminUser.post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' });
      });
      it('responds with a 404 if clothing does not exist', () =>
          adminUser.put('/api/clothings/5').send(clothing).expect(404));
      it('responds with a 404 if not a valid id', () =>
          adminUser.put('/api/clothings/dsk').send(clothing).expect(404));
      it('should respond with a 201', () =>
          adminUser.put(route).send(clothing)
          .expect(201));
      it('should respond with the updated clothing', () =>
          adminUser.put(route).send(clothing)
          .expect((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.name).to.equal('Pants');
            expect(res.body.id).to.equal(id);
          }));
    });
  });
  describe('DELETE /api/clothings/:id', () => {
    let route;
    let id;
    beforeEach(() => Clothing.create({
      name: 'T-Shirt',
    })
    .then((newclothing) => {
      id = newclothing.id;
      route = `/api/clothings/${id}`;
    })
    .then(() => Category.create({
      name: 'Polo',
      clothingId: id,
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
      it('responds with a 404 if clothing does not exist', () =>
        adminUser.delete('/api/clothings/5').expect(404));
      it('responds with a 404 if not a valid id', () =>
        adminUser.delete('/api/clothings/dsk').expect(404));
      it('should respond with a 204', () =>
        adminUser.delete(route).expect(204));
      it('should delete also all the designs associated to the clothing', () =>
        adminUser.delete(route)
        .then(() =>
          Category.findAll({ where: { clothingId: id } })
          .then(categories => expect(categories).to.have.lengthOf(0))));
    });
  });
});
