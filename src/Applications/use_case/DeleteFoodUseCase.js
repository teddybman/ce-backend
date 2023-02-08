class DeleteFoodUseCase {
  constructor({ foodRepository, userRepository }) {
    this._foodRepository = foodRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload, userId) {
    // console.log('UseCasePayload :', useCasePayload.params);
    const { foodId } = useCasePayload.params;
    // console.log('param ID :', foodId);

    await this._foodRepository.findFoodById(foodId)

    await this._userRepository.verifyAdminUser(userId)

    await this._foodRepository.deleteFood(foodId);
  }
}

module.exports = DeleteFoodUseCase;