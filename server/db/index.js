'use strict';
const Sequelize = require('sequelize'); 
const db = new Sequelize("postgres://postgres:postgres@localhost:5432/threads", { force: true, logging: false });

module.exports = db;