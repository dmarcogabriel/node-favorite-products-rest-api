const { isEmpty, isNil } = require('lodash');

exports.favoriteProduct = (sku, favoriteProducts = []) => {
  if (isNil(sku)) return 'Product sku is missing';
  if (isEmpty(favoriteProducts)) return null;

  if (favoriteProducts.some(favoriteProduct => favoriteProduct.sku === sku)) {
    return 'Product is already favorited';
  }
  return null;
};
