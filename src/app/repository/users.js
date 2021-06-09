const User = require('../models/User');

exports.create = async ({ name, email }) => {
  const user = User.build({ name, email });
  await user.save();
  return user;
};

exports.find = async () => {
  const users = await User.findAll();
  return users;
};
