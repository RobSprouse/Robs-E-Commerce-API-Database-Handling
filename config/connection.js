// COMMENT: initializes dotenv module
require('dotenv').config();

// COMMENT: imports Sequelize module
const Sequelize = require('sequelize');

// COMMENT: creates connection to database, whether local or JAWSDB
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// COMMENT: exports sequelize connection
module.exports = sequelize;
