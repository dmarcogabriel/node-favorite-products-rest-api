const validator = require('../utils/validator');
const repository = require('../repository/users');

exports.get = async (_, res) => {
  try {
    const users = await repository.find();
    res.status(200).json({
      message: 'Users loaded successfully',
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.post = async (req, res) => {
  try {
    const invalidFields = validator.validatePresence(req.body, ['name', 'email']);
    if (invalidFields) {
      res.status(400).json({
        error: {
          message: invalidFields,
        },
      });
    } else {
      const user = await repository.create(req.body);
      res.status(201).json({
        message: 'User created successfully',
        data: {
          user,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      data: {
        error: error.message,
      },
    });
  }
};
