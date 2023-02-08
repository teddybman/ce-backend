const InvariantError = require('../../Commons/exceptions/InvariantError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../Domains/users/UserRepository');

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);
    // console.log('verifyAvailableUsername : ', result.rows);

    if (result.rowCount) {
      throw new InvariantError('username is unavailable');
    }
  }

  async addUser(registerUser) {
    const { username, fullname, email, password, level } = registerUser;
    const id = `user-${this._idGenerator()}`;
    const createdDate = new Date().toISOString();
    const editedDate = createdDate;
    const isDeleted = 0;

    const query =  {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $2, $2) RETURNING id, username, fullname, email, level',
      values: [id, username, fullname, email, password, level, isDeleted, createdDate, editedDate,],
    };

    const result = await this._pool.query(query);

    return new RegisteredUser({ ...result.rows[0] });
    // return new RegisteredUser(
    //   result.rows[0].id, result.rows[0].username, result.rows[0].fullname, result.rows[0].email,
    //   result.rows[0].level, result.rows[0].isDeleted,
    // );
    // return new RegisteredUser({ id, username, fullname, email, level, isDeleted });
  }

  async getPasswordByUsername(username) {
    const query = {
      text: 'SELECT password FROM users WHERE username = $1',
      values: [username],
    }

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('username is not found');
    }

    const { password } = result.rows[0];
    
    return password;
  }

  async getIdByUsername(username) {
    const query = {
      text: 'SELECT id FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('username is not found');
    }

    const { id } = result.rows[0];

    return id;
  }

  async verifyAdminUser(userId) {
    const query = {
      text: 'SELECT level FROM users WHERE id =  $1',
      values: [userId],
    };
    console.log('Query :', query);

    const result = await this._pool.query(query);
    console.log('Level', result.rows[0].level);

    if (result.rows[0].level !== 1) {
      throw new AuthorizationError('Administrator level required to perform this action!');
    }
  }
}

module.exports = UserRepositoryPostgres;