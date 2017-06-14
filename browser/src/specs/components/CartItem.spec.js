import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import CartItem from '../../react/components/CartItem';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('CartItem component', () => {
  const cartItem = {
    productId: 3,
    designId: 1,
    imageUrl: '/pic',
    name: 'T-Shirt',
    color: 'red',
    size: 'M',
    price: 15,
    quantity: 5
  };
  it('should show the image of the product', () => {
    const wrapper = shallow(<CartItem cartItem={cartItem} />);
    expect(wrapper.find('img').length).to.equal(1);
    expect(wrapper.find('img').prop('src')).to.equal('/pic');
  });
  it('show the product detaul information', () => {
    const wrapper = shallow(<CartItem cartItem={cartItem} />);
    expect(wrapper.find('.name').text()).to.equal('T-Shirt');
    expect(wrapper.find('.color').text()).to.equal('red');
    expect(wrapper.find('.size').text()).to.equal('M');
    expect(wrapper.find('.price').text()).to.equal('15');
  });
  it('should be a Link to the design', () => {
    const wrapper = shallow(<CartItem cartItem={cartItem} />);
    expect(wrapper.find(Link).length).to.equal(1);
    expect(wrapper.find(Link).prop('to')).to.equal('/designs/1');
  });
  it('should render a select with the value of quantity', () => {
    const wrapper = shallow(<CartItem cartItem={cartItem} />);
    expect(wrapper.find('select').prop('value')).to.equal(5);
    expect(wrapper.find(Link).prop('to')).to.equal('/designs/1');
  });
  it('calls the delete function when button is clicked with product', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<CartItem cartItem={cartItem} removeFromCart={spy} />);
    wrapper.find('.delete').simulate('click');
    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(cartItem);
  });
  it('calls the update function when value chainges', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<CartItem cartItem={cartItem} updateQuantity={spy} />);
    wrapper.find('select').simulate('change', { target: { value: 3 } });
    expect(spy).to.have.been.called;
    expect(spy).to.have.been.calledWith(cartItem, 3);
  });
});
