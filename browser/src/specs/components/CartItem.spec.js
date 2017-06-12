import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import CartItem from '../../react/components/CartItem';

describe('CartItem component', () => {
  const cartItem = {
    productId: 3,
    designId: 1,
    imageUrl: '/pic',
    name: 'T-Shirt',
    color: 'red',
    size: 'M',
    price: 15,
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
});
