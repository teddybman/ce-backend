const FoodRepository = require('../FoodRepository');

describe('FoodRepository inteface', () => {
  it('should throw error when invoke abstract behaviour', async () => {
    // Arange
    const foodRepository = new FoodRepository();

    // Action and Assert
    await expect(foodRepository.addFood({})).rejects.toThrowError('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(foodRepository.editFood('')).rejects.toThrowError('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(foodRepository.deleteFood('')).rejects.toThrowError('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(foodRepository.verifyAvailableFoodName('')).rejects.toThrowError('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(foodRepository.getIdByFoodName('')).rejects.toThrowError('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(foodRepository.getAllFood()).rejects.toThrowError('FOOD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
});
})