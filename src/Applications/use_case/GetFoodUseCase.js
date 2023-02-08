class GetFoodUseCase {
  constructor({ foodRepository }) {
    this._foodRepository = foodRepository;
  }

  async execute() {
    const foods = await this._foodRepository.getAllFood();
    return foods;
  }
}

module.exports = GetFoodUseCase;