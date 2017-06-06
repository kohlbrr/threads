'use strict';

const expect = require('chai').expect;
const { Design } = require('../../db/models');

describe('Design Model', () => {
  beforeEach(() => {
    return Design.sync({force: true});
  });

  describe('Validators', () => {
    describe('Name', () => {

      it('Should throw an error if not a string', () => {
        let design = Design.build({
          name: [],
          sex: 'M',
          price: 1000
        });
        return design.validate().then(err => {
          expect(err).to.exist;
        });
      });

      it('Should throw an error if not defined', () => {
        let design = Design.build({
          sex: 'F',
          price: 1500
        });
        return design.validate().then(err => {
          expect(err).to.exist;
        });
      });
    });

    describe('Sex', () => {

      it('Should throw an error if not one of the enum values', (done) => {
        let design = Design.create({
          sex: 'A',
          name: 'Salt in the wind esq.',
          price: 8000000
        })
        .then(() => (done('I shoud not get here!')))
        .catch(() => done());
      });

      it('Should throw an error if not defined', () => {
        let design = Design.build({
          name: 'Plain White Shirt',
          price: 100000000
        });
        return design.validate().then(err => {
          expect(err).to.exist;
        });
      });
    });

    describe('Price', () => {
    
      it('Should throw an error if not an integer', (done) => {
        let design = Design.create({
          name: 'I <3 NY',
          sex: 'M',
          price: 22.95
        })
        .then(() => done('I should not get here!'))
        .catch(() => done());
      });
      
      it('Should throw an error if not defined', (done) => {
        let design = Design.create({
          name: 'I HATE NY',
          sex: 'F',
        })
        .then(() => done('I should not get here!'))
        .catch(() => done());
      });
    });
  });
});
