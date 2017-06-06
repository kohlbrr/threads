const Sequelize = require('sequelize');
const db = require('../index');


module.exports = db.define('clothing', {

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

