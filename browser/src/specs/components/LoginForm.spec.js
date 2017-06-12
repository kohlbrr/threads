import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import LoginForm from '../../react/components/LoginForm';

chai.use(sinonChai);


describe('LoginForm component', () => {
  let login;
  let submitLoginForm;
  let onChange;
  beforeEach('Create component', () => {
    submitLoginForm = spy();
    onChange = spy();
    login = shallow(<LoginForm handleChange={onChange} handleSubmit={submitLoginForm} />);
  });
  it('should be a <div>', () => {
    expect(login.is('div')).to.be.true;
  });
  it('should have email&password input fields', () => {
    expect(login.find('input').length).to.be.equal(2);
    expect(login.find('.email').length).to.be.equal(1);
    expect(login.find('.password').length).to.be.equal(1);
  });
  it('should have login button', () => {
    expect(login.find('button').length).to.be.equal(1);
  });

  it('invokes submitLoginForm when button login is clicked', () => {
    const loginButton = login.find('form');
    loginButton.simulate('submit');
    expect(submitLoginForm).to.have.been.called;
  });
  it('invokes onChange when email changes', () => {
    const loginButton = login.find('.email');
    loginButton.simulate('change', {target: {}});
    expect(onChange).to.have.been.called;
  });
  it('invokes onChange when password changes', () => {
    const loginButton = login.find('.password');
    loginButton.simulate('change', {target: {}});
    expect(onChange).to.have.been.called;
  });
});
