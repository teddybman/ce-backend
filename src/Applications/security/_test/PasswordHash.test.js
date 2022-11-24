const PasswordHash = require('../PasswordHash');

describe('PasswordHash internface', () => {
  it('should throw error when invoke abstract behaviour', async () => {
    // Arrange
    const passwordHash = new PasswordHash()

    // Action & Assert
    await expect(passwordHash.hash('dummy_password')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});