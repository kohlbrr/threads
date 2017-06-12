import { expect } from 'chai';
import designsReducer from '../../../react/reducers/designs-reducer';

describe('Designs Reducer', () => {
  it('should start with an initial state of an empty array', () => {
    expect(designsReducer(undefined, { type: 'INIT_STORE' }).length).to.equal(0);
  });
  it('should change the state to the array of designs', () => {
    const state = [];
    const designs = [{ name: 'Pants' }];
    const action = {
      type: 'RECEIVE_DESIGNS',
      designs,
    };
    expect(designsReducer(state, action).length).to.equal(1);
  });
  it('should return a new array', () => {
    const state = [];
    const designs = [{ name: 'Pants' }];
    const action = {
      type: 'RECEIVE_DESIGNS',
      designs,
    };
    expect(designsReducer(state, action)).to.not.equal(state);
  });
  it('should add a design to the state', () => {
    const state = [{ name: 'T-shirt' }];
    const designs = [{ name: 'Pants' }];
    const action = {
      type: 'RECEIVE_DESIGN',
      designs,
    };
    expect(designsReducer(state, action).length).to.equal(2);
  });
  it('should return a new array', () => {
    const state = [{ name: 'T-shirt' }];
    const designs = [{ name: 'Pants' }];
    const action = {
      type: 'RECEIVE_DESIGN',
      designs,
    };
    expect(designsReducer(state, action)).to.not.equal(state);
  });
});
