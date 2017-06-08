const chai = require('chai');
const { isLoggedIn, isAdmin } = require('../../middleware');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);

const expect = chai.expect;

describe('Auth Middleware', () => {
  describe('isLoggedIn', () => {
    it('executes next with no arguments if user is logged in', () => {
      const req = { user: { name: 'guille' } };
      const next = sinon.spy();
      isLoggedIn(req, null, next);
      expect(next).to.have.been.callCount(1);
      expect(next).to.have.been.calledWithExactly();
    });
    it('executes next with an error if there is no user', () => {
      const req = { user: null };
      const next = sinon.spy();
      isLoggedIn(req, null, next);
      expect(next).to.have.been.callCount(1);
      expect(next.args.length).to.equal(1);
    });
  });
  describe('isAdmin', () => {
    it('executes next with no arguments if user is Admin', () => {
      const req = { user: { isAdmin: true } };
      const next = sinon.spy();
      isAdmin(req, null, next);
      expect(next).to.have.been.callCount(1);
      expect(next).to.have.been.calledWithExactly();
    });
    it('executes next with an error if there is user but not admin', () => {
      const req = { user: { isAdmin: false } };
      const next = sinon.spy();
      isAdmin(req, null, next);
      expect(next).to.have.been.callCount(1);
      expect(next.args.length).to.equal(1);
    });
    it('executes next with an error if there is no user', () => {
      const req = { user: null };
      const next = sinon.spy();
      isAdmin(req, null, next);
      expect(next).to.have.been.callCount(1);
      expect(next.args.length).to.equal(1);
    });
  });
});
