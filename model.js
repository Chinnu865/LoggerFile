const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize')

const connection = new Sequelize('conversion', 'root', 'abcd@123', {
    dialect: 'mysql',
    logging: false
  });
  

const User = connection.define('user', {
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
});

module.exports = { User };
