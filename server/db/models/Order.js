const Sequelize = require('sequelize');
const db = require('../index');


module.exports = db.define('order', {

  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

