const Sequelize = require('sequelize');

const db = new Sequelize(/*process.env.DATABASE_URL*/'postgres://localhost:5432/threads', { logging: false, typeValidation: true });

module.exports = db;

require('./models');
