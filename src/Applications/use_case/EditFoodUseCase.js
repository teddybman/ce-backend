const NewFood = require("../../Domains/foods/entities/NewFood");

class EditFoodUseCase {
  constructor({ foodRepository }) {
    this._foodRepository = foodRepository;
  }

  async execute(useCasePayload, userId) {
    const { name, description, price, category } = useCasePayload.payload;
    const newFood = new NewFood({ name, description, price, category });


    const foodId = await this._foodRepository.findFoodIdByName(name);
    // console.log('Food ID:', foodId);
    return this._foodRepository.editFood({ newFood, foodId, userId });

  }
}

module.exports = EditFoodUseCase;