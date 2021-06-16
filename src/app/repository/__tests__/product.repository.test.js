const productRepository = require('../product.repository');
const { User } = require('../../models');

const mockProduct = {
  title: 'test',
  image: 'test-image',
  price: 999.99,
  reviewScore: 4.9,
  sku: 'this-is-a-sku',
};
let mockUserId;
let mockProductId;

describe('Product repository', () => {
  beforeAll(async () => {
    const user = await User.create({
      name: 'Product Repo Tester',
      email: 'product_repo@email.com',
      password: 'aaaaaa',
    });
    mockUserId = user.id;
  });

  afterAll(async () => {
    await User.destroy({ where: { id: mockUserId }, cascade: true });
  });

  it('should pass on create product', async () => {
    const product = await productRepository.create({ ...mockProduct, userId: mockUserId });

    expect(product.id).toEqual(expect.any(Number));
    expect(product.title).toEqual(mockProduct.title);
    expect(product.image).toEqual(mockProduct.image);
    expect(product.price).toEqual(mockProduct.price);
    expect(product.reviewScore).toEqual(mockProduct.reviewScore);
    expect(product.userId).toEqual(mockUserId);
    expect(product.sku).toEqual(mockProduct.sku);
    mockProductId = product.id;
  });

  it('should get products by user id', async () => {
    const products = await productRepository.findByUserId(mockUserId);
    expect(products).toEqual(expect.any(Array));
    expect(products).toHaveLength(1);
  });

  describe('find by id', () => {
    it('should pass on find by id', async () => {
      const product = await productRepository.fingById(mockProductId);
      expect(product.id).toEqual(mockProductId);
      expect(product.title).toEqual(mockProduct.title);
      expect(product.image).toEqual(mockProduct.image);
      expect(product.price).toEqual(mockProduct.price);
      expect(product.reviewScore).toEqual(mockProduct.reviewScore);
      expect(product.userId).toEqual(mockUserId);
      expect(product.sku).toEqual(mockProduct.sku);
    });

    it('should fail on find by id missing id', async () => {
      await productRepository.fingById().catch(err => {
        expect(err.message)
          .toEqual(
            // eslint-disable-next-line no-useless-escape
            'WHERE parameter \"id\" has invalid \"undefined\" value',
          );
      });
    });
  });
});
