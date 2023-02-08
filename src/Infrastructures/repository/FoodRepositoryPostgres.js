const InvariantError = require('../../Commons/exceptions/InvariantError');
const AddedFood = require('../../Domains/foods/entities/AddedFood');
const FoodRepository = require('../../Domains/foods/FoodRepository');

class FoodRepositoryPostgres extends FoodRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableFoodName(foodName) {
    // Unique key VS soft delete ???
    const query = {
      text: 'SELECT * FROM foods WHERE name = $1',
      values: [foodName],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('foodname is not available');
    }
  }

  async findFoodIdByName(foodName) {

    const query = {
      text: 'SELECT id FROM foods WHERE name = $1',
      values: [foodName],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('foodname is not found');
    }
    console.log('Find foodname by Id :', result.rows[0].id);
    return result.rows[0].id;
  }

  async findFoodById(foodId) {
    const query = {
      text: 'SELECT * FROM foods WHERE id = $1',
      values: [foodId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('food ID is not found');
    }
  }


  async addFood(newFood, userId) {
    const { name, description, price, category } = newFood;
    const id = `food-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO foods VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, name, description, price, category',
      values: [id, name, description, price, category, 0, date, date, userId, userId],
    };

    const result = await this._pool.query(query);

    // console.log('result : ', new AddedFood({ ...result.rows[0], ...parseFloat(result.rows[0].price) }));
    // return new AddedFood({ ...result.rows[0], ...parseFloat(result.rows[0].price) });

    return new AddedFood({ ...result.rows[0] });
  }

  async getAllFood() {
    const query = {
      text: 'SELECT * FROM foods',
      values: [],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async deleteFood(foodId) {
    const query = {
      text: 'UPDATE foods SET isdeleted = $1 WHERE id = $2',
      values: [1, foodId],
    };
    // console.log('query delete :', query);

    const result = await this._pool.query(query);
    // console.log(result);

    if (!result.rowCount) {
      throw new InvariantError('Deleting food was failed!');
    }    
  }

  async editFood({newFood, userId, foodId}) {
    const editedDate = new Date().toISOString();
    const { description, price, category } = newFood;
    const editedUser = userId;

    const query = {
      text: `UPDATE foods SET description  = $1, price = $2, category = $3, editeddate = $4,
             editeduser = $5 WHERE id = $6
            `,
      values: [description, price, category, editedDate, editedUser, foodId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Updating food was failed!');
    }    
  }
}

module.exports = FoodRepositoryPostgres;