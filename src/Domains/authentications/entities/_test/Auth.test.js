const Auth = require('../Auth');

describe('Auth entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken',
    };

    // Action & Assert
    expect(() => new Auth(payload)).toThrowError('AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 1234,
    };

    // Action & Assert
    expect(() => new Auth(payload)).toThrowError('AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create Auth entities correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    // Action
    const auth = new Auth(payload);

    // Assert
    expect(auth).toBeInstanceOf(Auth);
    expect(auth.accessToken).toEqual(payload.accessToken);
    expect(auth.refreshToken).toEqual(payload.refreshToken);
  });
});