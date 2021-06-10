const service = require('../services/products');
const validator = require('../utils/validator');
const repository = require('../repository/products');

exports.get = async (_, res) => {
  try {
    const { page, products } = await service.find();
    res.json({
      message: 'Products loaded successfully',
      data: {
        page,
        products,
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
    const invalidParams = validator.validatePresence(req.params, ['id']);
    if (invalidParams) {
      res.status(400).json({
        error: invalidParams,
      });
    } else {
      const product = await service.findById(req.params.id);
      res.status(200).json({
        message: 'Product loaded successfully',
        data: product,
      });
    }
  } catch (error) {
    if (error.response) {
      const { response } = error;
      res.status(response.status || 404).json({
        error: response.data.error_message || 'Product not found',
      });
    } else {
      res.status(500).json({
        error: error.message,
      });
    }
  }
};

exports.post = async (req, res) => {
  try {
    const params = ['id', 'title', 'image', 'price'];
    const invalidBody = validator.validatePresence(req.body, params);
    if (invalidBody) {
      res.status(400).json({
        error: invalidBody,
      });
    } else {
      const { body, params: { userId } } = req;
      const product = await repository.create({ ...body, userId });
      res.status(201).json({
        message: 'Product created successfully',
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
