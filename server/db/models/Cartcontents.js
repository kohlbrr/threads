const Sequelize = require('sequelize');
const db = require('../index');

const Cartcontents = db.define('cartcontents', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  //User_Id FK
  //Products FKs
});

module.exports = Cartcontents;
