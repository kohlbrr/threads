import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import CartDetails from '../../react/components/CartDetails';
import CartView from '../../react/components/CartView';
import CartList from '../../react/components/CartList';

describe('CartView Component', () => {
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
  it('should render CartDetails with totalPrice and handleCheckout', () => {
    const wrapper = shallow(<CartView cart={cart} />);
    expect(wrapper.find(CartDetails).props().totalPrice).to.equal(25);
  });
  it('should render CartList with the cart', () => {
    const wrapper = shallow(<CartView cart={cart} />);
    expect(wrapper.find(CartList).prop('cart')).to.equal(cart);
  });
});
