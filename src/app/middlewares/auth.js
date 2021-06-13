const jwt = require('jsonwebtoken');

const SECRET_HASH = process.env.SECRET;

const authorize = (req, res, next) => {
  const token = String(req.headers['x-access-token']);

  if (!token) {
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
