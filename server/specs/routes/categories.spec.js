const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../app');
const { Category, Design, User } = require('../../db/models');

const agent = session(app);

describe('Category API routes', () => {
  beforeEach(() => Category.sync({ force: true })
    .then(() => Design.sync({ force: true }))
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

  describe('GET /api/categories', () => {
    beforeEach(() => Category.create({
      name: 'T-Shirt',
    })
    .then(category => Design.create({
      name: 'Polo',
      price: 15,
      sex: 'M',
      categoryId: category.id,
    })));
    it('responds with 200', () => agent.get('/api/categories').expect(200));
    it('responds with an Array of Categories', () =>
        agent.get('/api/categories').expect((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal('T-Shirt');
        }));
  });
  describe('GET /api/categories/:id', () => {
    beforeEach(() => Category.create({
      name: 'T-Shirt',
    })
    .then(category => Design.create({
      name: 'Polo',
      price: 15,
      sex: 'M',
      categoryId: category.id,
    })));
    it('responds with 200', () => agent.get('/api/categories/1').expect(200));
    it('responds with a 404 if category does not exist', () =>
       agent.get('/api/categories/5').expect(404));
    it('responds with a 404 if not a valid id', () =>
       agent.get('/api/categories/lsks').expect(404));
    it('responds with a specific design', () =>
       agent.get('/api/categories/1').expect(res =>
        expect(res.body.name).to.equal('T-Shirt')));
    it('the category has a designs property with an array of designs', () =>
      agent.get('/api/categories/1').expect((res) => {
        expect(res.body.designs).to.be.an('array');
        expect(res.body.designs[0].name).to.equal('Polo');
      }));
  });
  describe('POST /api/categories', () => {
    const category = {
      name: 'T-Shirt',
    };
    it('should throw a 401 error if it is not login', () =>
       agent.post('/api/categories').send(category).expect(401));
    it('respond with a 401 if it is login but is not an Admin', () => {
      const notAdmin = session(app);
      return notAdmin.post('/auth/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then(() =>
        notAdmin.post('/api/categories').send(category).expect(401));
    });
    describe('Admin User', () => {
      let adminUser;
      beforeEach(() => {
        adminUser = session(app);
        return adminUser
        .post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' });
      });
      it('should respond with a 400 if not a valid category', () =>
        adminUser.post('/api/categories').send({ cake: 'chocolate' }).expect(400));
      it('should respond with a 201', () =>
        adminUser.post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' })
        .then(() =>
          adminUser.post('/api/categories').send(category).expect(201)));
      it('should respond with the created product', () =>
        adminUser.post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' })
        .then(() =>
          adminUser.post('/api/categories').send(category)
          .expect((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.name).to.equal('T-Shirt');
            expect(res.body).to.have.a.property('id');
          })));
    });
  });
  describe('PUT /api/categories/:id', () => {
    const category = {
      name: 'Pants',
    };
    let route;
    let id;
    beforeEach(() => Category.create({
      name: 'T-Shirt',
    })
    .then((newDesign) => {
      id = newDesign.id;
      route = `/api/categories/${id}`;
    }));
    it('should throw a 401 error if it is not login', () =>
       agent.put(route).send(category).expect(401));
    it('respond with a 401 if it is login but is not an Admin', () => {
      const notAdmin = session(app);
      return notAdmin.post('/auth/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then(() => {
        notAdmin.put(route).send(category).expect(401);
      });
    });
    describe('Admin User', () => {
      let adminUser;
      beforeEach(() => {
        adminUser = session(app);
        return adminUser.post('/auth/login')
        .send({ email: 'admin@admin.com', password: 'pass123' });
      });
      it('responds with a 404 if category does not exist', () =>
          adminUser.put('/api/categories/5').send(category).expect(404));
      it('responds with a 404 if not a valid id', () =>
          adminUser.put('/api/categories/dsk').send(category).expect(404));
      it('should respond with a 201', () =>
          adminUser.put(route).send(category)
          .expect(201));
      it('should respond with the updated category', () =>
          adminUser.put(route).send(category)
          .expect((res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.name).to.equal('Pants');
            expect(res.body.id).to.equal(id);
          }));
    });
  });
  describe('DELETE /api/categories/:id', () => {
    let route;
    let id;
    beforeEach(() => Category.create({
      name: 'T-Shirt',
    })
    .then((newCategory) => {
      id = newCategory.id;
      route = `/api/categories/${id}`;
    })
    .then(() => Design.create({
      name: 'Polo',
      price: 15,
      sex: 'M',
      categoryId: id,
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
      it('responds with a 404 if category does not exist', () =>
        adminUser.delete('/api/categories/5').expect(404));
      it('responds with a 404 if not a valid id', () =>
        adminUser.delete('/api/categories/dsk').expect(404));
      it('should respond with a 204', () =>
        adminUser.delete(route).expect(204));
      it('should delete also all the designs associated to the category', () =>
        adminUser.delete(route)
        .then(() =>
          Design.findAll({ where: { categoryId: id } })
          .then(designs => expect(designs).to.have.lengthOf(0))));
    });
  });
});
