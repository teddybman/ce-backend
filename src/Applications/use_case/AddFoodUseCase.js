const NewFood = require('../../Domains/foods/entities/NewFood');

class AddFoodUseCase {
  constructor({ foodRepository }) {
    this._foodRepository = foodRepository;
  }

  async execute(useCasePayload, userId) {
    const { name, description, price, category } = useCasePayload.payload;
    const newFood = new NewFood({ name, description, price, category });

    // console.log('UseCasePayload newFood : ', newFood);
    await this._foodRepository.verifyAvailableFoodName(name);

    return this._foodRepository.addFood(newFood, userId);
  }
}

module.exports = AddFoodUseCase;