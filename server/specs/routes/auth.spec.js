const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../app');
const { User } = require('../../db/models');

const agent = session(app);


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
      let loginRequest;
      beforeEach(() => {
        loggedUser = session(app);
        loginRequest = loggedUser.post('/auth/signup')
        .send({ email: 'guille@guille.com', password: 'guille' });
        return loginRequest;
      });
      it('should return 200', () =>
        loginRequest.expect(200));
      it('should return a user', () =>
        loginRequest
        .expect(res =>
          expect(res.body.email).to.equal('guille@guille.com')));
      it('should persist the session', () =>
        loggedUser.get('/auth/me')
        .expect(res => expect(res.body.email).to.equal('guille@guille.com')));
    });
  });
  describe('Log In', () => {
    beforeEach(() => User.create({
      email: 'guille@guille.com',
      password: 'guille',
    }));
    it('should return a 404 if user does not exist', () =>
       agent.post('/login')
        .send({ email: 'notUser@guille.com', password: 'pass123' })
        .expect(404));
    it('should return a 404 if user exist but has wrong password', () =>
      agent.post('/login')
      .send({ email: 'guille@guille.com', password: 'wrongPass' })
      .expect(404));
    describe('when succesfully log in', () => {
      let loggedUser;
      let loginRequest;
      beforeEach(() => {
        loggedUser = session(app);
        loginRequest = loggedUser.post('/auth/login')
        .send({ email: 'guille@guille.com', password: 'guille' });
        return loginRequest;
      });
      it('should return 200', () =>
        loginRequest.expect(200));
      it('should return a user', () =>
        loginRequest
        .expect(res =>
          expect(res.body.email).to.equal('guille@guille.com')));
      it('should persist the session', () =>
        loggedUser.get('/auth/me')
        .expect(res => expect(res.body.email).to.equal('guille@guille.com')));
    });
  });
});
