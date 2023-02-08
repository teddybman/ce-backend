class FoodsHandler {
  constructor({
    addFoodUseCase,
    getFoodUseCase,
    editFoodUseCase,
    deleteFoodUseCase,
  }) {
    this._addFoodUseCase = addFoodUseCase;
    this._getFoodUseCase = getFoodUseCase;
    this._editFoodUseCase = editFoodUseCase;
    this._deleteFoodUseCase = deleteFoodUseCase

    this.postFoodHandler = this.postFoodHandler.bind(this);
    this.getFoodHandler = this.getFoodHandler.bind(this);
    this.editFoodHandler = this.editFoodHandler.bind(this);
    this.deleteFoodHandler = this.deleteFoodHandler.bind(this);
  }

  async postFoodHandler(request, h) {
    // console.log('postFoodHandler terpanggil...');
    const { id: userId } = request.auth.credentials;
    
    const addedFood = await this._addFoodUseCase.execute(request, userId);

    const response = h.response({
      status: 'success',
      data: {
        addedFood,
      },
    });
    response.code(201);
    return response;
  }

  async getFoodHandler(request, h) {
    const allFood = await this._getFoodUseCase.execute();
    const response = h.response({
      status: 'success',
      data: allFood,
    });
    response.code(201);
    return response;
  }

  async deleteFoodHandler(request, h) {
    const { id } = request.auth.credentials;
    // console.log('user id :', id);
    const deleteFood = await this._deleteFoodUseCase.execute(request, id);
    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }

  async editFoodHandler(request, h) {
    const { id } = request.auth.credentials;

    // console.log('Request :', request);
    const editFood = await this._editFoodUseCase.execute(request, id)
    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = FoodsHandler;