import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
<<<<<<< HEAD:browser/specs/frontEnd/components/LoginForm.spec.js
import LoginForm from '../../../src/react/components/LoginForm';
=======
import LoginForm from '../../react/components/LoginForm';
>>>>>>> bffee499f6cb863db24dc0b4ad0fbd0c4f4b0fad:browser/src/specs/components/LoginForm.spec.js

describe('LoginForm component', () => {
  let login;
  let submitLoginForm;
  beforeEach('Create component', () => {
    submitLoginForm = spy();
    login = shallow(<LoginForm onSubmit={submitLoginForm} />);
  });
  it('should be a <div>', () => {
    expect(login.is('div')).to.be.true;
  });
  it('should have email&password input fields', () => {
    expect(login.find('input').length).to.be.equal(2);
    expect(login.find('#email')).to.be.equal(1);
    expect(login.find('#password')).to.be.equal(1);
  });
  it('should have login@ cancel button', () => {
    expect(login.find('button').length).to.be.equal(2);
  });
  it('should have auth with Facebook&Google links', () => {
    expect(login.find('a').length).to.be.equal(2);
  });
  it('invokes submitLoginForm when button login is clicked', () => {
    const loginButton = login.find('#login');
    loginButton.simulate('click');
    expect(submitLoginForm.called()).to.be.true;
  });
});
