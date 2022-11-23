const { renameTypeAttribute } = require('node-pg-migrate/dist/operations/types');
const RegisteredUser = require('../RegisteredUser');

describe('a RegisteredUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    //Arange
    const payload = {
      username: 'user',
      fullname: 'username',
      email: 'user@user.com',
      password: 'abc',
    };

    //Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  })

  it('should throw error when payload did not meet data type specification', () => {
    //Arange
    const payload = {
      id: 'user-123',
      username: 'user',
      fullname: 'username',
      email: 'user@user.com',
      password: 123,
      level: 1,
      isDeleted: true
    };

    //Action and Assert
    expect(() =>  new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  })

  it('should create registeredUser object correctly', () => {
    //Arange
    const payload = {
      id: 'user-123',
      username: 'user',
      fullname: 'username',
      email: 'user@user.com',
      password: 'abc',
      level: 1,
      isDeleted: true
    };

    //Action 
    const registeredUser = new RegisteredUser(payload);
    
    //Assert
    expect(registeredUser.id).toEqual(payload.id);
    expect(registeredUser.username).toEqual(payload.username);
    expect(registeredUser.password).toEqual(payload.password);
  })
})