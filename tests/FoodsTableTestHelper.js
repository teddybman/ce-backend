/* instanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');
const dummyDate = new Date().toISOString();
// const editedDate = createdDate;

const FoodsTableTestHelper = {
  async addFood({
    id = 'food-123',
    name = 'rice',
    description = 'contain a rice',
    price = 1000,
    category = 'food',
    isDeleted = 0,
    createdDate = dummyDate,
    editedDate = dummyDate,
    createdUser = 'user-123',
    editedUser = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO foods VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, name, description',
      values: [id, name, description, price, category, isDeleted, createdDate, editedDate, createdUser, editedUser]
    };

    await pool.query(query);
  },

  async editFood({
    id = 'food-123',
    name = 'rice',
    description = 'contain a rice',
    price = 1000,
    category = 'food',
    createdDate = dummyDate,
    editedDate = dummyDate,
    createdUser = 'user-123',
    editedUser = 'user-123',
  }) {
    const query = {
      text: `UPDATE foods SET name = $2, description = $3, price = $4, category = $5,
            isDeleted = $6, createdDate = $7, editedDate = $8, createdUser = $9, editedUser = $10 
            WHERE id = $1
            `,
      values: [id, name, description, price, category, createdDate, editedDate, createdUser, editedUser]
    };

    await pool.query(query);
  },

  async deleteFood(foodId) {
    const query = {
      text: 'DELETE FROM foods WHERE id = $1',
      values: [foodId],
    };

    await pool.query(query);
  },

  async getAllFood() {
    const query = {
      text: 'SELECT * FROM foods',
      values: [],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async getIdByFoodName(foodId) {
    const query = {
      text: 'SELECT * FROM foods WHERE id = $1',
      values: [foodId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async verifyAvailableFoodName(foodName) {
    const query = {
      text: 'SELECT * FROM foods WHERE name = $1',
      values: [foodName],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE foods CASCADE');
  },
};

module.exports = FoodsTableTestHelper;