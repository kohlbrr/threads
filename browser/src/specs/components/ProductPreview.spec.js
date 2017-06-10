import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ProductPreview from '../../react/components/ProductPreview';


describe('ProductPreview Component', () => {
  const design = {
    price: 15.99,
    name: 'T-Shirt',
    imageUrl: '/desPic',
    products: [
      { color: 'red',
        imageUrl: '/pic1',
        stock: 5,
        size: 'M',
        id: 1,
      }, {
        color: 'red',
        imageUrl: '/pic2',
        stock: 1,
        size: 'L',
        id: 2,
      }, {
        color: 'blue',
        imageUrl: '/pic3',
        stock: 2,
        size: 'S',
        id: 3,
      },
    ],
  };
  it('should render the image if it is passes one', () => {
    const wrapper = shallow(<ProductPreview design={design} imageUrl="/pic1"  />);
    expect(wrapper.find('img').props().src).to.equal('/pic1');
  });
  it('should render the default design image if no product seletcted', () => {
    const wrapper = shallow(<ProductPreview design={design} />);
    expect(wrapper.find('img').props().src).to.equal('/desPic');
  });
  it('should render the name of the design', () => {
    const wrapper = shallow(<ProductPreview design={design} />);
    expect(wrapper.find('h1').text()).to.equal('T-Shirt');
  });
});
