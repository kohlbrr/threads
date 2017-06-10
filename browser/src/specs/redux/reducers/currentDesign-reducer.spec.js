import { expect } from 'chai';
import currentDesignReducer from '../../../react/reducers/currentDesign-reducer';

describe('currentDesign Reducer', () => {
  it('should start with an initial state of an empty object', () => {
    expect(currentDesignReducer(undefined, { type: 'INIT_STORE' })).to.deep.equal({});
  });
  it('should change the state to the new currentDesign', () => {
    const state = { name: 'T-Shirt' };
    const design = { name: 'Pants' };
    const action = {
      type: 'SET_CURRENT_DESIGN',
      design,
    };
    expect(currentDesignReducer(state, action).name).to.equal('Pants');
  });
  it('should return a new object', () => {
    const state = { name: 'T-Shirt' };
    const design = { name: 'Pants' };
    const action = {
      type: 'SET_CURRENT_DESIGN',
      design,
    };
    expect(currentDesignReducer(state, action)).to.not.equal(state);
  });
});
