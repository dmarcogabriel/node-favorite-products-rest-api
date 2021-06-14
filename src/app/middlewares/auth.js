const jwt = require('jsonwebtoken');
const { isNil } = require('lodash');

const SECRET_HASH = process.env.SECRET;

const authorize = ({ headers }, res, next) => {
  const token = headers['x-access-token'] ? String(headers['x-access-token']) : null;

  if (isNil(token)) {
    res.status(401).json({
      message: 'Access denied',
    });
  } else {
    jwt.verify(token, SECRET_HASH, error => {
      if (error) {
        res.status(401).json({
          message: 'Invalid token',
        });
      } else next();
    });
  }
};

module.exports = { authorize };
