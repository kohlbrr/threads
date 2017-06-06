const expect = require('chai').expect;
const { User } = require('../../db/models');


describe('User Model', () => {
  beforeEach(() => User.sync({ force: true }));

  describe('Virtuals', () => {
    beforeEach(() => User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      address: '5 hannover Sq., NY',
      isAdmin: true,
      googleId: 'supersecretGoogleId',
      facebookId: 'supersecretFacebookId',
      password: 'plainTextPassword',
      salt: 'saltySalt',
    }));

    describe('User details', () => {
      it('Should create the user with proper details', () =>
         User.findOne({
           where: {
             email: 'john@doe.com',
           },
         })
        .then((user) => {
          expect(user.name).to.equal('John Doe');
          expect(user.address).to.equal('5 hannover Sq., NY');
          expect(user.isAdmin).to.equal(true);
          expect(user.googleId).to.equal('supersecretGoogleId');
          expect(user.facebookId).to.equal('supersecretFacebookId');
          expect(user.password).to.not.equal('plainTextPassword');
          expect(user.salt).to.not.equal('saltySalt');
        }));
    });
  });
    after(() => User.truncate());

});

