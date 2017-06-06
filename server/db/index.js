const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, { logging: false, typeValidation: true });

module.exports = db;

require('./models');
