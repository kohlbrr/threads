const Sequelize = require('sequelize');
const db = require('../index');

const Design = db.define('design', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sex: {
    type: Sequelize.ENUM('M','F'),
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(13, 2), // This will represent the price in cents
    allowNull: false,
  },
  // clothing fk
  // category fk
});

module.exports = Design;
