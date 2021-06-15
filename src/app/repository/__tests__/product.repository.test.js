const productRepository = require('../products');
const { User } = require('../../models');

const mockProduct = {
  title: 'test',
  image: 'test-image',
  price: 999.99,
  reviewScore: 4.9,
  sku: 'this-is-a-sku',
};

let mockUserId;

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
  });

  it('should get products by user id', async () => {
    const products = await productRepository.findByUserId(mockUserId);
    expect(products).toEqual(expect.any(Array));
    expect(products).toHaveLength(1);
  });
});
