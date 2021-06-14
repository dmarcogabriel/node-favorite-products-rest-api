const supertest = require('supertest');
const sinon = require('sinon');
const app = require('../../../server');
const db = require('../../../db');
const { User } = require('../../models');
const productRepository = require('../../repository/products');
const productService = require('../../services/products');

jest.mock('jsonwebtoken', () => ({
  verify(token, _, callback) {
    if (token === 'token') {
      callback(null);
    } else {
      callback(true);
    }
  },
}));
let mockUserId;
const mockProduct = {
  title: 'Test product',
  image: 'test-image-url',
  price: 999.99,
  sku: 'test-sku',
};

describe('Products controller', () => {
  beforeAll(async () => {
    await db.connect();
    const user = await User.create({
      name: 'Tester tester',
      password: 'aaaaaa',
      email: 'tester@tester.com',
    });
    mockUserId = user.id;
  });

  afterAll(async () => {
    await db.disconnect();
  });

  describe('POST method', () => {
    it('should pass on POST', async () => {
      const res = await supertest(app)
        .post('/products')
        .set('x-access-token', 'token')
        .send({ ...mockProduct, userId: mockUserId });

      const { message, data } = res.body;
      expect(res.status).toEqual(201);
      expect(message).toEqual('Product created successfully');
      expect(data.id).toEqual(expect.any(Number));
      expect(data.title).toEqual(mockProduct.title);
      expect(data.image).toEqual(mockProduct.image);
      expect(data.price).toEqual(mockProduct.price);
      expect(data.sku).toEqual(mockProduct.sku);
      expect(data.updatedAt).toEqual(expect.any(String));
      expect(data.createdAt).toEqual(expect.any(String));
    });

    it('should pass on POST another product with other sku', async () => {
      const sku = 'test-sku-2';
      const res = await supertest(app)
        .post('/products')
        .set('x-access-token', 'token')
        .send({ ...mockProduct, sku, userId: mockUserId });

      const { message, data } = res.body;
      expect(res.status).toEqual(201);
      expect(message).toEqual('Product created successfully');
      expect(data.id).toEqual(expect.any(Number));
      expect(data.title).toEqual(mockProduct.title);
      expect(data.image).toEqual(mockProduct.image);
      expect(data.price).toEqual(mockProduct.price);
      expect(data.sku).toEqual(sku);
      expect(data.updatedAt).toEqual(expect.any(String));
      expect(data.createdAt).toEqual(expect.any(String));
    });

    it('should fail on POST duplicated product', async () => {
      const res = await supertest(app)
        .post('/products')
        .set('x-access-token', 'token')
        .send({ ...mockProduct, userId: mockUserId });

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual('Product is already favorited');
    });

    it('should fail on POST', async () => {
      const errorMessage = 'Some error message';
      sinon.stub(productRepository, 'create').throws(Error(errorMessage));

      const res = await supertest(app)
        .post('/products')
        .set('x-access-token', 'token')
        .send({ ...mockProduct, sku: 'test-sku-3', userId: mockUserId });

      expect(res.status).toEqual(500);
      expect(res.body.error).toEqual(errorMessage);
    });

    it('should fail on POST missing params', async () => {
      const res = await supertest(app)
        .post('/products')
        .set('x-access-token', 'token')
        .send({ });

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual('Missing body or body is empty');
    });
  });

  describe('GET method', () => {
    it('should pass on GET products', async () => {
      const res = await supertest(app)
        .get('/products');

      const { message, data } = res.body;
      expect(res.status).toEqual(200);
      expect(message).toEqual('Products loaded successfully');
      expect(data.page).toEqual(1);
      expect(data.products).toEqual(expect.any(Array));
      expect(data.products).toHaveLength(100);
    });

    it('should fail to GET products', async () => {
      const errorMessage = 'Error on finding products';
      sinon.stub(productService, 'find').throws(Error(errorMessage));

      const res = await supertest(app).get('/products');

      expect(res.status).toEqual(500);
      expect(res.body.error).toEqual(errorMessage);
    });
  });
});
