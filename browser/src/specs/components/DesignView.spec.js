import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ProductPreview from '../../react/components/ProductPreview';
import DesignView from '../../react/components/DesignView';
import DesignDetail from '../../react/components/DesignDetail';


describe('DesignView component', () => {
  it('should render the DesignDetail', () => {
    const wrapper = shallow(<DesignView />);
    expect(wrapper.find(DesignDetail).length).to.equal(1);
  });
  it('should pass through the DesignDetail the props design, selectedColor, changeColor, changeProduct', () => {
    const wrapper = shallow(<DesignView
      design="design"
      selectedColor="selectedColor"
      changeColor="changeColor"
      changeProduct="changeProduct"
    />);
    expect(wrapper.find(DesignDetail).props().design).to.equal('design');
    expect(wrapper.find(DesignDetail).props().selectedColor).to.equal('selectedColor');
    expect(wrapper.find(DesignDetail).props().changeColor).to.equal('changeColor');
    expect(wrapper.find(DesignDetail).props().changeProduct).to.equal('changeProduct');
  });
  it('should render the ProductPreview', () => {
    const wrapper = shallow(<DesignView />);
    expect(wrapper.find(ProductPreview).length).to.equal(1);
  });
  it('should pass throught the ProductPreview the props design and selectedProduct', () =>{
    const wrapper = shallow(<DesignView
      design="design"
      selectedProduct="selectedProduct"
    />);
    expect(wrapper.find(ProductPreview).props().design).to.equal('design');
    expect(wrapper.find(ProductPreview).props().selectedProduct).to.equal('selectedProduct');
  });
});

