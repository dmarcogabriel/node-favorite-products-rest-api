const validator = require('../utils/validator');
const repository = require('../repository/auth.repository');

exports.post = async (req, res) => {
  try {
    const errorMessage = validator.validatePresence(req.body, ['email', 'password']);
    if (errorMessage) {
      res.status(400).json({
        error: errorMessage,
      });
    } else {
      const token = await repository.login(req.body);
      if (token) {
        res.status(200).json({
          message: 'User logged successfully',
          data: {
            token,
          },
        });
      } else {
        res.status(400).json({
          error: 'Email or password doesn\'t exists',
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
