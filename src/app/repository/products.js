const { Product } = require('../models');

exports.create = async ({
  title,
  image,
  price,
  userId,
  reviewScore,
  sku,
}) => {
  const product = Product.build({
    title, image, price, userId, reviewScore, sku,
  });
  await product.save();
  return product;
};

exports.findByUserId = async userId => {
  const product = await Product.findAll({ where: { userId } });
  return product;
};
