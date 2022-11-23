class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);
    
    const { username, fullname, email, password, level } = payload;

    this.username = username;
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.level = level;
  }

  _verifyPayload({ username, fullname, email, password, level }) {
    if (!username || !fullname || !email || !password || !level ) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof fullname !== 'string' || typeof email !== 'string' ||
      typeof password !== 'string' || typeof level !== 'number'
    ) {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (username.length > 50) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR');
    }

    if (!username.match(/^[a-zA-Z1-9]+$/)) {
      throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }

    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
      throw new Error('REGISTER_USER.EMAIL_NOT_CONTAIN_VALID_EMAIL_ADDRESS');
    }
  }
}

module.exports = RegisterUser;