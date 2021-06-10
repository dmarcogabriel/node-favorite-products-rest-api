const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Product = require('./Product');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Product, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
// sequelize.sync({ force: true });

module.exports = User;
