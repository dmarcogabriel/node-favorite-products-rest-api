const bcrypt = require('bcrypt');
const authRepository = require('../auth.repository');
const { User } = require('../../models');

const mockUser = {
  email: 'auth_repository@email.com',
  password: bcrypt.hashSync('aaaaaa', bcrypt.genSaltSync()),
  name: 'Auth Repo Tester',
};
let mockUserId;

describe('User repository', () => {
  beforeAll(async () => {
    const user = await User.create(mockUser);
    mockUserId = user.id;
  });

  afterAll(async () => {
    await User.destroy({ where: { id: mockUserId } });
  });

  it('should pass on authentication', async () => {
    const token = await authRepository.login({
      email: mockUser.email,
      password: 'aaaaaa',
    });
    expect(token).toEqual(expect.any(String));
  });

  it('should fail on authentication without email', async () => {
    const token = await authRepository.login({
      password: 'aaaaaa',
    });
    expect(token).toEqual(null);
  });

  it('should fail on authentication wrong email', async () => {
    const token = await authRepository.login({
      email: 'wrong@email.com',
      password: 'aaaaaa',
    });
    expect(token).toEqual(null);
  });

  it('should fail on authentication missing password', async () => {
    const token = await authRepository.login({
      email: mockUser.email,
    });
    expect(token).toEqual(null);
  });

  it('should fail on authentication wrong password', async () => {
    const token = await authRepository.login({
      email: mockUser.email,
      password: 'bbbbbb',
    });
    expect(token).toEqual(null);
  });

  it('should fail on empty params', async () => {
    authRepository.login().catch(err => {
      expect(err.message).toEqual(
        'Cannot destructure property \'email\' of \'undefined\' as it is undefined.',
      );
    });
  });
});
