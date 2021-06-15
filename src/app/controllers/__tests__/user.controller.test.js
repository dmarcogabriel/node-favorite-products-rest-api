const supertest = require('supertest');
const sinon = require('sinon');
const app = require('../../../server');
const userRepository = require('../../repository/users');

jest.mock('jsonwebtoken', () => ({
  verify(token, _, callback) {
    if (token === 'token') {
      callback(null);
    } else {
      callback(true);
    }
  },
}));
const mockUser = {
  name: 'Tester tester',
  email: 'user_controller@email.com',
  password: 'aaaaaa',
};
let mockUserId;

describe('User controller', () => {
  beforeEach(() => {
    sinon.reset();
  });

  describe('POST', () => {
    it('should pass on POST /users', async () => {
      const res = await supertest(app)
        .post('/api/users')
        .send(mockUser)
        .set('x-access-token', 'token');

      const { data, message } = res.body;
      expect(res.status).toEqual(201);
      expect(message).toEqual('User created successfully');
      expect(data.user.id).toEqual(expect.any(Number));
      expect(data.user.name).toEqual(mockUser.name);
      expect(data.user.email).toEqual(mockUser.email);
      expect(data.user.password).toEqual(expect.any(String));
      mockUserId = data.user.id;
    });

    it('should fail on POST /users with duplicated email', async () => {
      const res = await supertest(app)
        .post('/api/users')
        .send({
          name: 'Tester Two',
          email: mockUser.email,
          password: 'aaaaaa',
        });

      expect(res.status).toEqual(500);
      expect(res.body.error).toEqual('Email must be unique');
    });

    it('should fail on POST /users', async () => {
      const errorMessage = 'Testing error';
      sinon.stub(userRepository, 'create').throws(Error(errorMessage));
      const res = await supertest(app)
        .post('/api/users')
        .send(mockUser);

      expect(res.status).toEqual(500);
      expect(res.body.error).toEqual(errorMessage);
    });

    it('should fail on POST /users with null params', async () => {
      const res = await supertest(app)
        .post('/api/users')
        .send({});

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual('Missing body or body is empty');
    });

    it('should fail on POST /users missing required params', async () => {
      const res = await supertest(app)
        .post('/api/users')
        .send({ password: 'password' });

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual('Missing required params: name, email');
    });

    it('should fail on POST /users invalid email', async () => {
      const res = await supertest(app)
        .post('/api/users')
        .send({ email: 'invalid', name: 'name', password: 'password' });

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual('Email format is invalid');
    });
  });

  describe('GET method', () => {
    it('should pass on GET /users', async () => {
      const res = await supertest(app)
        .get('/api/users')
        .set('x-access-token', 'token');

      const { message, data } = res.body;
      expect(res.status).toEqual(200);
      expect(message).toEqual('Users loaded successfully');
      expect(data.users).toEqual(expect.any(Array));
    });

    it('should fail on GET /users', async () => {
      const errorMessage = 'Testing error';
      sinon.stub(userRepository, 'find').throws(Error(errorMessage));
      const res = await supertest(app)
        .get('/api/users')
        .set('x-access-token', 'token');

      expect(res.status).toEqual(500);
      expect(res.body.error).toEqual(errorMessage);
    });
  });

  describe('GET By ID method', () => {
    it('should pass on GET /users/:id', async () => {
      const res = await supertest(app)
        .get(`/api/users/${mockUserId}`)
        .set('x-access-token', 'token');

      const { message, data } = res.body;
      expect(res.status).toEqual(200);
      expect(message).toEqual('User loaded successfully');
      expect(data.user.id).toEqual(mockUserId);
      expect(data.user.name).toEqual(mockUser.name);
      expect(data.user.email).toEqual(mockUser.email);
      expect(data.user.password).toEqual(expect.any(String));
    });

    it('should fail on GET /users/:id', async () => {
      const errorMessage = 'Testing error';
      sinon.stub(userRepository, 'findOne').throws(Error(errorMessage));
      const res = await supertest(app)
        .get(`/api/users/${mockUserId}`)
        .set('x-access-token', 'token');

      expect(res.status).toEqual(500);
      expect(res.body.error).toEqual(errorMessage);
    });
  });

  describe('PUT method', () => {
    it('should pass on PUT /users/:id', async () => {
      const res = await supertest(app)
        .put(`/api/users/${mockUserId}`)
        .set('x-access-token', 'token')
        .send({ ...mockUser, name: 'Updated Name' });

      const { message, data } = res.body;
      expect(res.status).toEqual(200);
      expect(message).toEqual('User updated successfully');
      expect(data.user.id).toEqual(mockUserId);
      expect(data.user.name).toEqual('Updated Name');
      expect(data.user.email).toEqual(mockUser.email);
      expect(data.user.password).toEqual(expect.any(String));
    });

    it('should fail on PUT /users/:id', async () => {
      const errorMessage = 'Testing error';
      sinon.stub(userRepository, 'update').throws(Error(errorMessage));
      const res = await supertest(app)
        .put(`/api/users/${mockUserId}`)
        .set('x-access-token', 'token')
        .send({ ...mockUser, name: 'Updated Name' });

      expect(res.status).toEqual(500);
      expect(res.body.error).toEqual(errorMessage);
    });
  });

  describe('DELETE method', () => {
    it('should pass on DELETE /users/:id', async () => {
      const res = await supertest(app)
        .delete(`/api/users/${mockUserId}`)
        .set('x-access-token', 'token');

      const { message } = res.body;
      expect(res.status).toEqual(200);
      expect(message).toEqual('User deleted successfully');
    });

    it('should fail on DELETE /users/:id', async () => {
      const errorMessage = 'Testing error';
      sinon.stub(userRepository, 'remove').throws(Error(errorMessage));
      const res = await supertest(app)
        .delete(`/api/users/${mockUserId}`)
        .set('x-access-token', 'token');

      expect(res.status).toEqual(500);
      expect(res.body.error).toEqual(errorMessage);
    });
  });
});
