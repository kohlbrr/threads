/* eslint-disable extensions */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import DesignItem from '../../react/components/DesignItem';

describe('<DesignItem, />', () => {
  const design = {
    name: 'T-Shirt',
    price: 15,
    id: 1,
    imageUrl: 'http://placeholder.it/500x500',
  };
  it('renders an image with the correct src', () => {
    const wrapper = shallow(<DesignItem design={design} />);
    expect(wrapper.find('img')).to.have.length(1);
    expect(wrapper.find('img').prop('src')).to.equal(design.imageUrl);
  });
  it('has a h3 with the name of the design', () => {
    const wrapper = shallow(<DesignItem design={design} />);
    expect(wrapper.find('h3')).to.have.length(1);
    expect(wrapper.find('h3').text()).to.equal(design.name);
  });
  it('has a p with the price of the design', () => {
    const wrapper = shallow(<DesignItem design={design} />);
    expect(wrapper.find('p')).to.have.length(1);
    expect(wrapper.find('p').text()).to.equal(`$${design.price}`);
  });
  it('has a Link tag to the design', () => {
    const wrapper = shallow(<DesignItem design={design} />);
    expect(wrapper.find(Link)).to.have.length(1);
    expect(wrapper.find(Link).prop('to')).to.equal(`/designs/${design.id}`);
  });
});
