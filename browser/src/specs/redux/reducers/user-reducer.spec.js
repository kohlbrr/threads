import { expect } from 'chai';
import userReducer from '../../../react/reducers/user-reducer';


describe('User reducer', () => {
  it('should set the initial user as null', () => {
    expect(userReducer(undefined, { action: 'INIT_STORE' })).to.equal(null);
  });
  it('should change the user', () => {
    const user = { email: 'guille' };
    const action = {
      type: 'SET_USER',
      user,
    };
    expect(userReducer(null, action).email).to.equal('guille');
  });
});
