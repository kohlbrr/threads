import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import DesignDetail from '../../react/components/DesignDetail';

chai.use(sinonChai);

describe('Design Detail component', () => {
  const design = {
    price: 15.99,
    name: 'T-Shirt',
    products: [
      { color: 'red',
        stock: 5,
        size: 'M',
        id: 1,
      }, {
        color: 'red',
        stock: 1,
        size: 'L',
        id: 2,
      }, {
        color: 'blue',
        stock: 2,
        size: 'S',
        id: 3,
      },
    ],
  };
  it('should render the price of the design', () => {
    const wrapper = shallow(<DesignDetail design={design} selectedColor={'red'} />);
    expect(wrapper.find('.price').text()).to.equal('15.99');
  });
  it('should render all possible colors not repeating', () => {
    const wrapper = shallow(<DesignDetail design={design} selectedColor={'red'} />);
    expect(wrapper.find('.color').length).to.equal(2);
    expect(wrapper.find('.color').first().text()).to.equal('red');
    expect(wrapper.find('.color').last().text()).to.equal('blue');
  });
  it('should only render the sizes of the selected color', () => {
    const wrapper = shallow(<DesignDetail design={design} selectedColor={'red'} />);
    expect(wrapper.find('.size').length).to.equal(2);
    expect(wrapper.find('.size').first().text()).to.equal('M');
    expect(wrapper.find('.size').last().text()).to.equal('L');
  });
  it('should execute changeColor when a color is clicked with the correct color as argument', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<DesignDetail design={design} changeColor={spy} selectedColor={'red'} />);
    wrapper.find('.color').first().simulate('click');
    expect(spy).to.have.been.called; // eslint-disable-line no-unused-expressions
    expect(spy).to.have.been.calledWith('red');
  });
  it('should execute changeProduct when a size is clicked with the correnct product', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<DesignDetail design={design} changeProduct={spy} selectedColor={'red'} />);
    wrapper.find('.size').first().simulate('click');
    expect(spy).to.have.been.called; // eslint-disable-line no-unused-expressions
    expect(spy).to.have.been.calledWith(design.products[0]);
  });
});
