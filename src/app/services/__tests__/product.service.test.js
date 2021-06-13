const productService = require('../products');

describe('Product service', () => {
  it('should pass on GET products', async () => {
    const data = await productService.find();
    expect(data.page).toEqual(1);
    expect(data.products).toHaveLength(100);
  });

  it('should pass on GET products on page 2', async () => {
    const data = await productService.find(2);
    expect(data.page).toEqual(2);
    expect(data.products).toHaveLength(100);
  });

  it('should pass on GET product by id', async () => {
    const { products } = await productService.find();
    const [product] = products;
    const data = await productService.findById(product.id);
    expect(data).toEqual(product);
  });
});
