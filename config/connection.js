const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
// require('dotenv').config({ path: '../.env' });

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: false
    },
  );
}



module.exports = sequelize;

