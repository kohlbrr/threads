const Sequelize = require('sequelize');
const db = require('../index');


module.exports = db.define('category', {

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

