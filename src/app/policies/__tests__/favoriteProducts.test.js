const { favoriteProduct } = require('../favoriteProduct');

describe('Favorite Product Policies', () => {
  it('should pass on favorite product on empty favorite products', () => {
    const errorMessage = favoriteProduct('testSku');
    expect(errorMessage).toEqual(null);
  });

  it('should pass on favorite product on existing favorite products', () => {
    const errorMessage = favoriteProduct('aaaaaa', [{ sku: 'bbbbbb' }]);
    expect(errorMessage).toEqual(null);
  });

  it('should fail on null sku', () => {
    const errorMessage = favoriteProduct();
    expect(errorMessage).toEqual('Product sku is missing');
  });

  it('should fail on favorite product on existing favorite products', () => {
    const favoriteProducts = [{ sku: 'aaaaaa' }];
    const errorMessage = favoriteProduct('aaaaaa', favoriteProducts);
    expect(errorMessage).toEqual('Product is already favorited');
  });

  it('should fail on favorite product on existing more favorite products', () => {
    const favoriteProducts = [{ sku: 'aaaaaa' }, { sku: 'bbbbbb' }];
    const errorMessage = favoriteProduct('aaaaaa', favoriteProducts);
    expect(errorMessage).toEqual('Product is already favorited');
  });
});
