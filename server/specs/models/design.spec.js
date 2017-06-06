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
          color: 'Red'
        });
        return design.validate().then(err => {
          expect(err).to.exist;
        });
      });
    });

    describe('Color', () => {

      it('Should throw an error if not a string', () => {
        let design = Design.build({
          color: [],
          name: 'Small'
        });
        return design.validate().then(err => {
          expect(err).to.exist;
        });
      });

      it('Should throw an error if not defined', () => {
        let design = Design.build({
          name: 'Large'
        });
        return design.validate().then(err => {
          expect(err).to.exist;
        });
      });
    });
  });
});
