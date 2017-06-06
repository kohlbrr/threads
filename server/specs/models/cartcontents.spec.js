'use strict';

const expect = require('chai').expect;
const { Cartcontents, Product } = require('../../db/models');

describe('Cartcontents Model', () => {
  beforeEach(() => {
    return Cartcontents.sync({force: true});
  });

  describe('Validators', () => {
    describe('Quantity', () => {

      it('Should throw an error if not a number', (done) => {
        Cartcontents.create({
          quantity: 'hehe',
        })
        .then(() => done('It shouldn\'t validate'))
        .catch(() => done());
      });

      it('Should throw an error if not defined', (done) => {
        Cartcontents.create({
          quantity: null,
        })
        .then(() => done('It shouldn\'t validate'))
        .catch(() => done());
      });
    });
  });
});
