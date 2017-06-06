const expect = require('chai').expect;
const { Order } = require('../../db/models');


describe('Order Model', function(){
  beforeEach(function() {
   return Order.sync({ force: true });
  });

  describe('Virtuals', function(){

    beforeEach( function() {
      return Order.create({
        status: 'NEW',
        timestamp: new Date(),
      });
    });

  describe('Order details', function(){
    it('Should create the Order with proper details',function(){
        return Order.findOne({
          where: {
            status: 'NEW'
          },
        })
        .then(function(order) {
          expect(order.status).to.equal('NEW');
        });
    });
  });
  });
});


