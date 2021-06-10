const Product = require('../models/Product');

exports.create = async ({
  id,
  title,
  image,
  price,
  userId,
}) => {
  const product = Product.build({
    id, title, image, price, userId,
  });
  await product.save();
  return product;
};
