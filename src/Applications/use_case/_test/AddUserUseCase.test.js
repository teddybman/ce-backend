const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHash = require('../../security/PasswordHash');
const AddUserUseCase = require('../AddUserUseCase');

describe('AddUserUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'user',
      fullname: 'username',
      email: 'my@email.com',
      password: 'secret_password',
      level: 1,
      // isDeleted: 0,
    };
    
    const expectedRegisteredUser = new RegisteredUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
      email: useCasePayload.email,
      level: useCasePayload.level,
      // isDeleted: useCasePayload.isDeleted,
    });

    // Dependency of use case
    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();

    // Mocking needed function
    mockUserRepository.verifyAvailableUsername = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockPasswordHash.hash = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockUserRepository.addUser = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedRegisteredUser));

    // Create use case instance
    const getUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    // Action
    const registeredUser = await getUserUseCase.execute(useCasePayload);

    // Assert
    expect(registeredUser).toStrictEqual(expectedRegisteredUser);
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUser({
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
      email: useCasePayload.email,
      password: 'encrypted_password',
      level: useCasePayload.level,
      // isDeleted: useCasePayload.isDeleted,
    }));
  });
});