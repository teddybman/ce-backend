const RegisterUser = require('../RegisterUser');

describe('a RegisterUser entities', () => {
  it('should throw an error when payload did not contain needed property', () => {
    //Arange
    const payload = {
      username: 'abc',
      fullname: 'abc',
      password: 'abc'
    };

    //Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    //Arange
    const payload = {
      username: 123,
      fullname: 'abc',
      email: 'abc',
      password: 123,
      level: 1
    };

    //Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when username contains more than 50 character', () => {
    // Arrange
    const payload = {
      username: 'mamamiamamamiammamiammamiamammaiamammmaiamammaimmammaimammmammiammmaiammammaiamma',
      fullname: 'user',
      email: 'abc',
      password: 'abc',
      level: 4
    };
    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username contains restricted character', () => {
    // Arrange
    const payload = {
      username: 'us er',
      fullname: 'username',
      email: 'asdf',
      password: 'abc',
      level: 2
    };
    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should throw error when email not contains valid format', () => {
    // Arrange
    const payload = {
      username: 'user',
      fullname: 'username',
      email: 'user ca',
      password: 'abc',
      level: 2
    };
    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.EMAIL_NOT_CONTAIN_VALID_EMAIL_ADDRESS');
  });

  it('should create registerUser object correctly', () => {
    // Arrange
    const payload = {
      username: 'user',
      fullname: 'username',
      email: 'user@email.com',
      password: 'abc',
      level: 1
    };

    // Action
    const { username, fullname, password } = new RegisterUser(payload);

    // Assert
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
    expect(password).toEqual(payload.password);
  });
});