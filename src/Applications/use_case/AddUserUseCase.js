const RegisterUser = require('../../Domains/users/entities/RegisterUser');

class AddUserUseCase {
  constructor({ userRepository, passwordHash }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    // console.log('AddUserUseCase execute terpanggil...');
    const registerUser = new RegisterUser(useCasePayload);
    await this._userRepository.verifyAvailableUsername(registerUser.username);
    registerUser.password = await this._passwordHash.hash(registerUser.password);
    // console.log('AddUserUseCase - registerUser : ', registerUser);
    return this._userRepository.addUser(registerUser);
  }
}

module.exports = AddUserUseCase;