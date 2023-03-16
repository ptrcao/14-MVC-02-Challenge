const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
// require('dotenv').config({ path: '../.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.PORT,
  }
);

module.exports = sequelize;

