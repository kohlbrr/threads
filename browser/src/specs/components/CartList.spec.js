import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import CartItem from '../../react/components/CartItem';
import CartList from '../../react/components/CartList';


describe('CartList Component', () => {
  const cart = [{
    productId: 3,
    designId: 1,
    imageUrl: '/pic',
    name: 'T-Shirt',
    color: 'red',
    size: 'M',
    price: 15,
  }, {
    productId: 2,
    designId: 2,
    imageUrl: '/pic2',
    name: 'Tees',
    color: 'blue',
    size: 'S',
    price: 10,
  }];
  it('should render a CartItem for each cartElement', () => {
    const wrapper = shallow(<CartList cart={cart} />);
    expect(wrapper.find(CartItem).length).to.equal(2);
  });
  it('should pass the single cartItem as prop', () => {
    const wrapper = shallow(<CartList cart={cart} />);
    expect(wrapper.find(CartItem).first().prop('cartItem').name).to.equal('T-Shirt');
  });
});
