const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const { Category } = require('../../db/models');
const db = require('../../db');

const agent = supertest.agent(app);

function toPlainObject(instance) {
  return instance.get({ plain: true });
}

describe('Category API routes', () => {
  let category;

  before(() => db.sync({ force: true }));


//   before(() => Category.create([{ name: 'Category 1' }])
//   .then((ret) => { category = ret; }));
  beforeEach(function () {
    return Category.create({
      name: 'Category 1',
    })
    .then(function (c) {
      category = c;
    });
  });

  describe('GET ALL /api/categories', () => {
    it('responds with 200', () => agent.get('/api/categories').expect(200));
    it('responds with an Array of Categories', () =>
        agent.get('/api/categories').expect((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal('Category 1');
        }));
  });


  describe('POST /api/categories', () => {
    const newCategory = { name: 'Category 3' };
    it('should throw a 401 error if it is not login', () =>
       agent.post('/api/categories').send(newCategory).expect(401));
    it('respond with a 401 if it is login but is not an Admin', () =>
       agent.post('/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then((res) => {
        const req = agent.post('/api/categories');
        req.cookies = res.headers['set-cookies'];
        return req.send(newCategory).expect(401);
      }));
  });

  describe('PUT /api/categories/:id', () => {
    const newCategory = { name: 'Category updated' };
    beforeEach(() => Category.create({
      name: 'Category 4',
    })
    .then((ret) => { category = ret; }));
    it('should throw a 401 error if it is not login', () =>
       agent.put(`/api/categories/${category.id}`)
       .send(newCategory)
       .expect(401));
    it('respond with a 401 if it is login but is not an Admin', () =>
       agent.post('/login')
      .send({ email: 'notadmin@admin.com', password: 'pass123' })
      .then((res) => {
        const req = agent.put(`/api/categories/${category.id}`);
        req.cookies = res.headers['set-cookies'];
        return req.send(newCategory).expect(401);
      }));
    describe('Admin User', () => {
      let cookies;
      before(() =>
        agent.post('/login')
        .send({ email: 'admin@admin.com', password: 'pass123' })
        .then((res) => {
          cookies = res.headers['set-cookies'];
        }));
      it('responds with a 404 if category does not exist', () => {
        const req = agent.put('/api/categories/5');
        req.cookies = cookies;
        return req.expect(404);
      });
      it('responds with a 404 if not a valid id', () => {
        const req = agent.put('/api/categories/lsks');
        req.cookies = cookies;
        return req.expect(404);
      });
      it('should respond with a 200', () => {
        const req = agent.put(`/api/categories/${category.id}`, newCategory);
        req.cookies = cookies;
        return req.expect(200);
      });
      it('should respond with the updated category', () => {
        const req = agent.put(`/api/categories/${category.id}`, newCategory);
        req.cookies = cookies;
        return req.expect((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal(category.id);
          expect(res.body).to.eql(toPlainObject(res));
        });
      });
    });
  });
});
