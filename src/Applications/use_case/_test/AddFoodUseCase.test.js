const NewFood = require('../../../Domains/foods/entities/NewFood');
const AddedFood = require('../../../Domains/foods/entities/AddedFood');
const FoodRepository = require('../../../Domains/foods/FoodRepository');
const AddFoodUseCase = require('../AddFoodUseCase');

describe('AddFoodUseCase', () => {
  fit('should orchestrating create new food action correctly', async () => {
    const useCasePayload = {
      payload: { name: 'rice', description: 'contain a rice', category: 'food', price: 1000 }
    };

    const expectedAddedFood = new AddedFood({
      id: 'food-123',
      name: 'rice',
      description: 'contain a rice',
      price: 1000,
      category: 'food',
    });

    const mockFoodRepository = new FoodRepository();

    const getFoodUseCase = new AddFoodUseCase({
      foodRepository: mockFoodRepository,
    });

    mockFoodRepository.addFood = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedFood));

    const addedFood = await getFoodUseCase.execute(useCasePayload);

    expect(addedFood).toStrictEqual(expectedAddedFood);
    expect(mockFoodRepository.addFood).toBeCalledWith({
      name: 'rice',
      description: 'contain a rice',
      price: 1000,
      category: 'food',
    });
  });
});