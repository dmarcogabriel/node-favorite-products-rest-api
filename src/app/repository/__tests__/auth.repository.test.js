const bcrypt = require('bcrypt');
const authRepository = require('../auth.repository');
const { User } = require('../../models');

let mockUserId;

describe('User repository', () => {
  beforeAll(async () => {
    const user = User.build({
      email: 'tester@email.com',
      password: bcrypt.hashSync('aaaaaa', bcrypt.genSaltSync()),
      name: 'User Tester',
    });
    const { id } = await user.save();
    mockUserId = id;
  });

  afterAll(async () => {
    await User.destroy({ where: { id: mockUserId } });
  });

  it('should pass on authentication', async () => {
    const token = await authRepository.login({
      email: 'tester@email.com',
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

  it('should fail on authentication missing  email', async () => {
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
      email: 'tester@email.com',
    });
    expect(token).toEqual(null);
  });

  it('should fail on authentication wrong password', async () => {
    const token = await authRepository.login({
      email: 'tester@email.com',
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
