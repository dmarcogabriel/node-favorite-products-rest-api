const bcrypt = require('bcrypt');
const { Product } = require('../models');
const { User } = require('../models');

exports.create = async ({ name, email, password }) => {
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync());
  const user = User.build({ name, email, password: passwordHash });
  await user.save();
  return user;
};

exports.find = async () => {
  const users = await User.findAll({ include: Product });
  return users;
};

exports.findOne = async id => {
  const user = await User.findOne({ where: { id }, include: Product });
  return user;
};

exports.update = async (id, { name, email }) => {
  await User.update({ name, email }, { where: { id } });
  const user = await User.findOne({ where: { id } });
  return user;
};

exports.remove = async id => {
  await User.destroy({ where: { id } });
};
