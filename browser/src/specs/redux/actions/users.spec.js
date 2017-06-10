import { expect } from 'chai';

import { setCurrentUser } from '../../../react/action-creators/users';

describe('User actions', () => {
  
  describe('setCurrentUser', () => {
    // Expect a properly formatted action to be sent
    it('returns a properly formatted action', () => {
      const user = {
        name: 'Eusher McCurrent',
        email: 'its@too.early',
        password: 'elr843ffjpr39j498wp'
      };
      expect(setCurrentUser(user)).to.be.deep.equal({
        type: 'SET_CURRENT_USER',
        user: user
      });
    });
  });

  // AXIOS STUFF_
  // getUserById

});
