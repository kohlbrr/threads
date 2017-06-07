const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const { User } = require('../../db/models');

const agent = supertest.agent(app);


describe('Auth Routes', () => {
  beforeEach(() => User.sync({ force: true }));
  describe('Sign Up', () => {
    it('should return a 400 if not a valid user', () =>
      agent.post('/auth/signup')
      .send({ email: 'guille@guille.com' })
      .expect(400));
    it('should return a 400 if user already exists', () =>
      User.create({ email: 'guille@guille.com', password: 'guille' })
      .then(() =>
        agent.post('/auth/signup')
        .send({ email: 'guille@guille.com' })
        .expect(400)));
    it('should return 302 when succesfully signup', () =>
      agent.post('/auth/signup')
      .send({ email: 'guille@guille.com', password: 'guille' })
      .expect(302));
    it('should succesfully create a user when signup', done =>
      agent.post('/auth/signup')
      .send({ email: 'guille@guille.com', passoword: 'guille' })
      .expect(() =>
        User.findOne({ where: { email: 'guille@guille.com' } })
        .then((user) => {
          expect(user.email).to.equal('guille@guille.com');
          done();
        })));
    it('should return a cookie', () =>
      agent.post('/auth/signup')
      .send({ email: 'guille@guille.com', passoword: 'guille' })
      .expect(res => expect(res.headers['set-cookies'].to.be.a('string'))));
    it('should persist the session', () =>
        agent.post('/auth/signup')
        .send({ email: 'guille@guille.com', passoword: 'guille' })
        .then((res) => {
          const req = agent.get('/auth/me');
          req.cookies = res.headers['set-cookies'];
          return req.expect(nextRes => expect(nextRes.body.email).to.equal('guille@guille.com'));
        }));
  });
});
