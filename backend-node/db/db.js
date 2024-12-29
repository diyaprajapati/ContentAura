const { Sequelize } = require('sequelize');
require('dotenv').config();

// from the .env file
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  dialectOptions: {
    ssl: false,
  },
  logging: false,
});

module.exports = sequelize;
