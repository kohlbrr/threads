import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Cart from '../../../browser/src/react/components/Cart';

describe('Cart component', () => {

    let cart;
    beforeEach('Create component', () => {
         cart = shallow(<Cart products={} />);
    });

    it('should be a <div> with an expected background', () => {
        expect(cart.is('div')).to.be.equal(true));
        expect(cart.get(0).props.style.background).to.be.equal('rgb(255, 183, 205)');
    });

});