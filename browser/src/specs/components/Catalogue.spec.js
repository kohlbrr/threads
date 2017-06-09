/* eslint-disable extensions */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import DesignItem from '../../react/components/DesignItem';
import Catalogue from '../../react/components/Catalogue';

describe('Catalogue Component', () => {
  const designs = [
    {
      name: 'T-Shirt',
      price: 15,
      id: 1,
      imageUrl: 'http://placeholder.it/500x500',
    },
    {
      name: 'Pants',
      price: 10,
      id: 2,
      imageUrl: 'http://placeholder.it/500x500',
    },
  ];
  it('should render a DesignItem for each design', () => {
    const wrapper = shallow(<Catalogue designs={designs} />);
    expect(wrapper.find(DesignItem)).to.have.length(2);
  });
  it('should pass each design as a prop', () => {
    const wrapper = shallow(<Catalogue designs={designs} />);
    expect(wrapper.find(DesignItem).first().props().design.name).to.equal('T-Shirt');
  });
});
