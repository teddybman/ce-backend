// const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');
// const ClientError =  require('../../../../Commons/exceptions/ClientError');
// const DomainErrorTranslator = require('../../../../Commons/exceptions/DomainErrorTranslator');

class UsersHandler {
  constructor({ addUserUseCase }) {
    // this._container = container;
    this._addUserUseCase = addUserUseCase;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    // console.log('postUserHandler terpanggil....');
    // const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    // const addedUser = await addUserUseCase.execute(request.payload);
    const addedUser = await this._addUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;