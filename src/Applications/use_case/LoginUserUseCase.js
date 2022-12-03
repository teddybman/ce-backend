const UserLogin = require('../../Domains/users/entities/UserLogin');
const Authentication = require('../../Domains/authentications/entities/Auth');

class LoginUserUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    authenticationTokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    // console.log('LoginUserUseCase terpanggil...');
    const { username, password } = new UserLogin(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

    await this._passwordHash.comparePassword(password, encryptedPassword);


    const id = await this._userRepository.getIdByUsername(username);
    // console.log('EncryptedPassword : ', id, encryptedPassword);

    const accessToken = await this._authenticationTokenManager.createAccessToken({ username, id });
    const refreshToken = await this._authenticationTokenManager.createRefreshToken({ username, id });

    // console.log('TOKEN : ', accessToken, refreshToken);

    const authentication = new Authentication({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addToken(authentication.refreshToken);

    // console.log('Authentication : ', authentication);
    return authentication;
  }
}

module.exports = LoginUserUseCase;