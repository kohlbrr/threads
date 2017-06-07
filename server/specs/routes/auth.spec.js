const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const { User } = require('../../db/models');

const agent = supertest.agent(app);


describe('Auth Routes', () => {
  beforeEach(() => User.sync({ force: true }));
  describe('Sign Up', () => {
    it('should return a 401 if not a valid user', () =>
      agent.post('/auth/signup')
      .send({ email: 'guille@guille.com' })
      .expect(401));
    it('should return a 401 if user already exists', () =>
      User.create({ email: 'guille@guille.com', password: 'guille' })
      .then(() =>
        agent.post('/auth/signup')
        .send({ email: 'guille@guille.com' })
        .expect(401)));
    describe('when succesfully sign up', () => {
      let loggedUser;
      before(() => {
        loggedUser = agent.post('/auth/signup')
        .send({ email: 'guille@guille.com', password: 'guille' });
      });
      it('should return 200', () =>
        loggedUser.expect(200));
      it('should succesfully create a user when signup', () =>
        loggedUser.expect(() =>
          User.findOne({ where: { email: 'guille@guille.com' } })
          .then(user => expect(user.email).to.equal('guille@guille.com'))));
      it('should return a user', () => {
        loggedUser
        .expect((res) => {
          expect(res.body.email).to.equal('guille@guille.com');
        });
      });
      it('should persist the session', () => {
        loggedUser.then(() =>
          loggedUser.get('/auth/me')
          .expect(res => expect(res.body.email).to.equal('guille@guille.com')));
      });
    });
  });
});
