// Tommy og Anders
const Sequelize = require('sequelize');

const sequelize = new Sequelize('protest', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
