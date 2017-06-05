const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/threads', { logging: false, typeValidation: true });


module.exports = db;
