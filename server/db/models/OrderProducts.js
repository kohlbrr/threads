const Sequelize = require('sequelize');
const db = require('../index');
const Product = require('./Product');

module.exports = db.define('orderproducts', {

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
},{
  hooks: {
    afterCreate: (orderProduct) => {
      Product.findOne({
        where: { id: orderProduct.productId }
      })
      .then(product => product.decrement('stock', { by: orderProduct.quantity }));
    }
  }
});
