const Sequelize = require('sequelize');
const db = require('../index');


module.exports = db.define('orderproducts', {

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  price: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
});

