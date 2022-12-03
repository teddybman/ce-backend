/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');
const createdDate = new Date().toISOString();
const editedDate = createdDate;
 
const UsersTableTestHelper = {
  async addUser({
    id = 'user-123', username = 'user', fullname = 'username', email = 'my@email.com', 
         password = 'secret_password', level = 1, isDeleted = 0, 
  }) {
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $2, $2)',
      values: [id, username, fullname, email, password, level, isDeleted, createdDate, editedDate,],
    };
 
    await pool.query(query);
  },
 
  async findUsersById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };
 
    const result = await pool.query(query);
    return result.rows;
  },
 
  async cleanTable() {
    await pool.query('DELETE FROM users WHERE 1=1');
  },
};
 
module.exports = UsersTableTestHelper;