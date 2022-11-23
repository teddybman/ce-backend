class RegisteredUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, username, fullname, email, password, level, isDeleted } = payload;

    this.id = id;
    this.username = username;
    this.fullname = fullname ;
    this.email = email;
    this.password = password;
    this.level = level;
    this.isDeleted = isDeleted;
  }

  _verifyPayload({ id, username, fullname, email, password, level, isDeleted }) {
    if (!id || !username || !fullname || !email || !password || !level ) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string' || 
      typeof email !== 'string' || typeof password !== 'string' || typeof level !== 'number' || 
      typeof isDeleted !== 'boolean'
    ) {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

}

module.exports = RegisteredUser;