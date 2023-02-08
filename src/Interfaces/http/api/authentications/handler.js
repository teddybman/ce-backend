// const LoginUserUseCase = require("../../../../Applications/use_case/LoginUserUseCase");
// const LogoutUserUseCase = require("../../../../Applications/use_case/LogoutUserUseCase");
// const RefreshAuthenticationUseCase = require("../../../../Applications/use_case/RefreshAuthenticationUseCase");


class AuthenticationsHandler {
    constructor({
      loginUserUseCase,
      refreshAuthenticationUseCase,
      logoutUserUseCase,
    }) {
      // this._container = container;
      // console.log('Handler container : ', container);
      this._loginUserUseCase = loginUserUseCase;
      this._refreshAuthenticationUseCase = refreshAuthenticationUseCase;
      this._logoutUserUseCase = logoutUserUseCase;

      this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
      this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
      this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
    }

  async postAuthenticationHandler(request, h) {
    // console.log('postAuthenticationHandler terpanggil... ');
    // const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);

    // console.log('loginUserUseCase : ', loginUserUseCase);
    const { accessToken, refreshToken } = await this._loginUserUseCase.execute(request.payload);
    // console.log('Token : ', accessToken, refreshToken);
    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request, h) {
    // console.log('putAuthenticationHandler terpanggil...');
    // const refreshAuthenticationUseCase = this._container.getInstance(RefreshAuthenticationUseCase.name);
    const accessToken = await this._refreshAuthenticationUseCase.execute(request.payload);
    // console.log('access token :', accessToken);

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    // const logoutUserUseCase = this._getInstance(LogoutUserUseCase.name);
    await this._logoutUserUseCase.execute(request.payload);
    return {
      status: 'success'
    };
  }
}

module.exports = AuthenticationsHandler;