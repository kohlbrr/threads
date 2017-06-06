const Sequelize = require('sequelize');
const db = require('../index');

const Product = db.define('product', {
  size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
