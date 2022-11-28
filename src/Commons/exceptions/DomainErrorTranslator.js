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
}

module.exports = DomainErrorTranslator;