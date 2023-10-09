//db configurations for Sequelize to connect to MSSQL

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mssql',
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'LocalHost',
  port: process.env.PORT,
  dialectOptions: {
    options: {
      encrypt: true,
    },
  },
});

// Log when the application starts
console.log('Starting the application...');

module.exports = sequelize;

