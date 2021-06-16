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

exports.getById = async (req, res) => {
  try {
    const user = await repository.findOne(req.params.id);
    res.status(200).json({
      message: 'User loaded successfully',
      data: {
        user,
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
    let errorMessage;
    errorMessage = validator
      .validatePresence(req.body, ['name', 'email', 'password']);
    if (errorMessage) {
      res.status(400).json({
        error: errorMessage,
      });
    } else {
      errorMessage = validator.validateEmail(req.body.email);
      if (errorMessage) {
        res.status(400).json({
          error: errorMessage,
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
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.put = async (req, res) => {
  try {
    const errorMessage = validator.validatePresence(req.body, ['name', 'email']);
    if (errorMessage) {
      res.status(400).json({
        error: errorMessage,
      });
    } else {
      const user = await repository.update(req.params.id, req.body);
      res.status(200).json({
        message: 'User updated successfully',
        data: {
          user,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await repository.remove(req.params.id);
    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
