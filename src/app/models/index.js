const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/database');
const createUserModel = require('./User');
const createProductModel = require('./Product');

const sequelize = new Sequelize(config);

const Product = createProductModel(sequelize, DataTypes);
const User = createUserModel(sequelize, DataTypes);

User.hasMany(Product, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
Product.belongsTo(User);

module.exports = {
  sequelize,
  Sequelize,
  User,
  Product,
};
