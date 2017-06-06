const expect = require('chai').expect;
const { Category } = require('../../db/models');


describe('Category Model', function() {
  beforeEach(function() {
   return Category.sync({ force: true });
  });

  describe('Virtuals', function(){

    beforeEach( function() {
      return Category.create({
        name: 'NEW_CATEGORY',
      });
    });

  describe('Category details', function() {
    it('Should create the Category with proper name', function() {
        return Category.findOne({
          where: {
            name: 'NEW_CATEGORY',
          },
        })
        .then( function ( category ) {
          expect(category.status).to.equal('NEW_CATEGORY');
        });
    });
  });
  });
});


