const userRepository = require('../users');

const mockUser = {
  name: 'User Repo Tester',
  email: 'user_repo@tester.com',
  password: 'aaaaaa',
};
let mockUserId;

describe('User repository', () => {
  it('should pass on create user', async () => {
    const user = await userRepository.create(mockUser);
    mockUserId = user.id;

    expect(user.name).toEqual(mockUser.name);
    expect(user.id).toEqual(expect.any(Number));
    expect(user.password).toEqual(expect.any(String));
    expect(user.email).toEqual(mockUser.email);
  });

  it('should fail on create user with existing email', async () => {
    try {
      await userRepository.create(mockUser);
    } catch (error) {
      expect(error.message).toEqual('Email must be unique');
    }
  });

  it('should pass on get users', async () => {
    const users = await userRepository.find();
    expect(users).toEqual(expect.any(Array));
  });

  it('should pass on get user by id', async () => {
    const user = await userRepository.findOne(mockUserId);

    expect(user.name).toEqual(mockUser.name);
    expect(user.id).toEqual(mockUserId);
    expect(user.password).toEqual(expect.any(String));
    expect(user.email).toEqual(mockUser.email);
  });

  it('should pass on update user', async () => {
    const user = await userRepository.update(mockUserId, {
      ...mockUser,
      name: 'Updated User Repo Tester',
    });
    expect(user.name).toEqual('Updated User Repo Tester');
  });

  it('should fail on update user', async () => {
    try {
      await userRepository.update(mockUserId);
    } catch (error) {
      expect(error.message)
        .toEqual(
          'Cannot destructure property \'name\' of \'undefined\' as it is undefined.',
        );
    }
  });

  it('should pass on remove user', async () => {
    await userRepository.remove(mockUserId);
    const user = await userRepository.findOne(mockUserId);
    expect(user).toEqual(null);
  });

  it('should fail on get user by id', async () => {
    const user = await userRepository.findOne(mockUserId);
    expect(user).toEqual(null);
  });
});
