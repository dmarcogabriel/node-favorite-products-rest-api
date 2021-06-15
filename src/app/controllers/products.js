const service = require('../services/products');
const validator = require('../utils/validator');
const repository = require('../repository/products');
const { favoriteProduct } = require('../policies/favoriteProduct');

exports.get = async (req, res) => {
  try {
    const { page, products } = await service.find(req.query.page);
    res.status(200).json({
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
    const product = await repository.fingById(req.params.id);
    if (product) {
      res.status(200).json({
        message: 'Product loaded successfully',
        data: {
          product,
        },
      });
    } else {
      res.status(400).json({
        error: 'Product not founded',

      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.post = async (req, res) => {
  try {
    const params = ['userId', 'sku'];
    const invalidBody = validator.validatePresence(req.body, params);
    if (invalidBody) {
      res.status(400).json({
        error: invalidBody,
      });
    } else {
      const favoritedProducts = await repository.findByUserId(req.body.userId);
      const errorMessage = favoriteProduct(req.body.sku, favoritedProducts);
      if (errorMessage) {
        res.status(400).json({
          error: errorMessage,
        });
      } else {
        const {
          price, image, title, id: sku, reviewScore,
        } = await service.findBySku(req.body.sku);
        const product = await repository.create({
          image, price, reviewScore, sku, title, userId: req.body.userId,
        });
        res.status(201).json({
          message: 'Product created successfully',
          data: product,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
