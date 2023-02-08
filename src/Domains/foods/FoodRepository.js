class FoodRepository {
  async addFood(newFood, userId) {
    throw new Error('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async editFood(foodId) {
    throw new Error('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteFood(foodId) {
    throw new Error('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllFood() {
    throw new Error('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getIdByFoodName(foodId) {
    throw new Error('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAvailableFoodName(foodName) {
    throw new Error('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async findFoodName(foodId) {
    throw new Error('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = FoodRepository;