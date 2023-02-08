const FoodsTableTestHelper = require('../../../../tests/FoodsTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NewFood = require('../../../Domains/foods/entities/NewFood');
const AddedFood = require('../../../Domains/foods/entities/AddedFood');
const pool = require('../../database/postgres/pool');
const FoodRepositoryPostgres = require('../FoodRepositoryPostgres');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

describe('FoodRepositoryPostgres', () => {
  afterEach(async () => {
    await FoodsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('verifyAvailableFoodName function', () => {
    it('should throw InvariantError when food name not available', async () => {
      // Arrange
      await FoodsTableTestHelper.addFood({ foodname: 'rice' });
      const foodRepositoryPostgres = new FoodRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(foodRepositoryPostgres.verifyAvailableFoodName('rice')).rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when foodname available', async () => {
      // Arrange
      const foodRepositoryPostgres = new FoodRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(foodRepositoryPostgres.verifyAvailableFoodName('rice')).resolves.not.toThrowError(InvariantError);
    });
  });

  describe('an AddFood function', () => {
    it('should persist new food and return added food correctly', async () => {
      const newFood = ({
        name: 'rice',
        description: 'contain a rice',
        price: 1000,
        category: 'food',
      });

      await UsersTableTestHelper.addUser({ username: 'user' });
      const userId = 'user-123' // get request from database, instead of dummy

      const fakeIdGenerator = () => '123';
      const foodRepositoryPostgres = new FoodRepositoryPostgres(pool, fakeIdGenerator);

      const addedFood = await foodRepositoryPostgres.addFood(newFood, userId);
      const food = await FoodsTableTestHelper.getIdByFoodName('food-123');
      expect(addedFood.id).toEqual('food-123');
    });
  });
});