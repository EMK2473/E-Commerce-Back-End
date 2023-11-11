require('dotenv').config(); 
// load environ variables- returns environment object
// environment object 
// write environment variables for using sequelize
const Sequelize = require('sequelize');
// if new sequelize, process.env my url(if it exists?), else connect with my name, user and pword
const sequelize = process.env.host
  ? new Sequelize(process.env.host)
  : new Sequelize(process.env.n, process.env.u, process.env.p, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });
module.exports = sequelize;

