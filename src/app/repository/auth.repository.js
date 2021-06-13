const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isNil } = require('lodash');
const User = require('../models/User');

const SECRET_HASH = process.env.SECRET;
const EXPIRATION_TIME = 60000;

exports.login = async ({ email, password }) => {
  if (isNil(email) || isNil(password)) return null;
  const user = await User.findOne({
    where: { email },
  });
  if (!user) return null;
  if (bcrypt.compareSync(password, user.password)) {
    return jwt.sign({ email }, SECRET_HASH, {
      expiresIn: EXPIRATION_TIME,
    });
  }
  return null;
};
