import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import CartDetails from '../../react/components/CartDetails';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('CartDetail Component', () => {
  it('renders the total price', () => {
    const wrapper = shallow(<CartDetails totalPrice={50} />);
    expect(wrapper.find('.totalPrice').text()).to.equal('$ 50');
  });
  it('calls the handleCheckout function when button is clicked', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<CartDetails totalPrice={50} handleCheckout={spy} />);
    wrapper.find('.checkout').simulate('click');
    expect(spy).to.have.been.called;
  });

});
