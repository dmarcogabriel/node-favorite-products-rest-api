const supertest = require('supertest');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const app = require('../../../server');
const authRepository = require('../../repository/auth.repository');
const { User } = require('../../models');

jest.mock('jsonwebtoken', () => ({
  verify(token, _, callback) {
    if (token === 'token') {
      callback(null);
    } else {
      callback(true);
    }
  },
  sign() {
    return 'token';
  },
}));
const mockUser = {
  name: 'Auth Ctrl tester',
  email: 'auth_controller@email.com',
  password: bcrypt.hashSync('aaaaaa', bcrypt.genSaltSync()),
};
let mockUserId;

describe('Auth controller', () => {
  beforeAll(async () => {
    const user = await User.create(mockUser);
    mockUserId = user.id;
  });

  beforeEach(() => {
    sinon.reset();
  });

  afterAll(async () => {
    await User.destroy({ where: { id: mockUserId } });
  });

  describe('POST', () => {
    it('should pass on POST /auth/login', async () => {
      const res = await supertest(app)
        .post('/api/auth/login')
        .send({
          email: mockUser.email,
          password: 'aaaaaa',
        });

      const { message, data } = res.body;
      expect(res.status).toEqual(200);
      expect(message).toEqual('User logged successfully');
      expect(data).toEqual({ token: 'token' });
    });

    it('should fail on POST /auth/login missing password param', async () => {
      const res = await supertest(app)
        .post('/api/auth/login')
        .send({
          email: mockUser.email,
        });

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual('Missing required params: password');
    });

    it('should fail on POST /auth/login missing email param', async () => {
      const res = await supertest(app)
        .post('/api/auth/login')
        .send({
          password: mockUser.password,
        });

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual('Missing required params: email');
    });

    it('should fail on POST /auth/login wrong email/password combination', async () => {
      const res = await supertest(app)
        .post('/api/auth/login')
        .send({
          email: 'another@email.com',
          password: mockUser.password,
        });

      expect(res.status).toEqual(400);
      expect(res.body.error).toEqual('Email or password doesn\'t exists');
    });

    it('should fail on POST /auth/login server error', async () => {
      const errorMessage = 'Testing server error';
      sinon.stub(authRepository, 'login').throws(Error(errorMessage));
      const res = await supertest(app)
        .post('/api/auth/login')
        .send({
          email: 'another@email.com',
          password: mockUser.password,
        });

      expect(res.status).toEqual(500);
      expect(res.body.error).toEqual(errorMessage);
    });
  });
});
