const expect = require('chai').expect;
const { Product } = require('../../db/models');

describe('Product Model', () => {
  beforeEach(() => {
    return Product.sync({force: true});
  });

  describe('Validators', () => {
    describe('Size', () => {

      it('Should throw an error if not a string', () => {
        let product = Product.build({
          color: 'Blue',
          size: []
        });
        return product.validate().then(err => {
          expect(err).to.exist;
        });
      });

      it('Should throw an error if not defined', () => {
        let product = Product.build({
          color: 'Red'
        });
        return product.validate().then(err => {
          expect(err).to.exist;
        });
      });
    });

    describe('Color', () => {

      it('Should throw an error if not a string', () => {
        let product = Product.build({
          color: [],
          size: 'Small'
        });
        return product.validate().then(err => {
          expect(err).to.exist;
        });
      });

      it('Should throw an error if not defined', () => {
        let product = Product.build({
          size: 'Large'
        });
        return product.validate().then(err => {
          expect(err).to.exist;
        });
      });
    });
  });
    after(() => Product.truncate());

});
