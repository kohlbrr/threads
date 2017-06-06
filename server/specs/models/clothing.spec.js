const expect = require('chai').expect;
const { Clothing } = require('../../db/models');


describe('Clothing Model', function(){
  beforeEach(function() {
   return Clothing.sync({ force: true });
  });

  describe('Virtuals', function(){

    beforeEach( function() {
      return Clothing.create({
        name: 'NEW_CLOTH',
      });
    });

  describe('Clothing details', function(){
    it('Should create the Clothing with proper name',function(){
        return Clothing.findOne({
          where: {
            name: 'NEW_CLOTH',
          },
        })
        .then(function(clothing) {
          expect(clothing.status).to.equal('NEW_CLOTH');
        });
    });
  });
  });
});


