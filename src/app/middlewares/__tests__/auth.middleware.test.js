const authMiddleware = require('../auth');

jest.mock('jsonwebtoken', () => ({
  verify(token, _, callback) {
    if (token === 'token') {
      callback(null);
    } else {
      callback(true);
    }
  },
}));

const mockNext = jest.fn();
let mockStatus;
let mockJsonReturn;
const mockRes = {
  status: status => {
    mockStatus = status;
    return {
      json: obj => {
        mockJsonReturn = obj;
      },
    };
  },
};

describe('Auth middleware', () => {
  beforeEach(() => {
    mockStatus = null;
    mockJsonReturn = null;
  });

  it('should pass on authentication', () => {
    const headers = { 'x-access-token': 'token' };
    authMiddleware.authorize({ headers }, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should fail on authentication with wrong token', () => {
    const headers = { 'x-access-token': 'wrong' };
    authMiddleware.authorize({ headers }, mockRes, mockNext);
    expect(mockStatus).toEqual(401);
    expect(mockJsonReturn).toEqual({ message: 'Invalid token' });
  });

  it('should fail on authentication with null token', () => {
    const headers = { 'x-access-token': null };
    authMiddleware.authorize({ headers }, mockRes, mockNext);
    expect(mockStatus).toEqual(401);
    expect(mockJsonReturn).toEqual({ message: 'Access denied' });
  });

  it('should fail on authentication with null headers', () => {
    const headers = { };
    authMiddleware.authorize({ headers }, mockRes, mockNext);
    expect(mockStatus).toEqual(401);
    expect(mockJsonReturn).toEqual({ message: 'Access denied' });
  });
});
