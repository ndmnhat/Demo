const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	connectionLimit: 10,
	dialect: 'mysql',
});

module.exports = sequelize;
