const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
    'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('unable to create new user, not contain needed property'),
    'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('unable to create new user, not meet data type specification'),
    'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('unable to create new user, character limit exceeded'),
    'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('unable to create user, contain restricted character'),
    'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('username and password is required'),
    'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username and password must string'),
    'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('refresh token is required'),
    'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token must string'),
    'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('refresh token is required'),
    'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token must string'),
    'ADDED_FOOD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('unable to create new food, not contain needed property'),
    'ADDED_FOOD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('unable to create new food, not meet data type specification'),
    'CREATE_FOOD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('unable to create new food, not contain needed property'),
    'CREATE_FOOD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('unable to create new food, not meet data type specification'),
    // 'ADD_FOOD.FOOD_NAME_IS_NOT_AVAILABLE': new InvariantError('unable to create new food, food name is exist'),
}

module.exports = DomainErrorTranslator;