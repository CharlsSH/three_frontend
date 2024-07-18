const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'Any', 'Lion King123', {
  host: '192.168.104.204',
  dialect: 'mysql',
});

module.exports = { sequelize };