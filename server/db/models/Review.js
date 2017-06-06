const Sequelize = require('sequelize');
const db = require('../index');


module.exports = db.define('review', {
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 1,
    },
  },
  content: {
    type: Sequelize.TEXT,
  },
});
