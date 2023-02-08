/* istanbul ignore file */

// external agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const pool = require('./database/postgres/pool');

// service (repository, helper, manager, etc)
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const FoodRepositoryPostgres = require('./repository/FoodRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');
const JwtTokenManager = require('./security/JwtTokenManager');

// use case
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const LoginUserUseCase = require('../Applications/use_case/LoginUserUseCase');
const LogoutUserUseCase = require('../Applications/use_case/LogoutUserUseCase');
const RefreshAuthenticationUseCase = require('../Applications/use_case/RefreshAuthenticationUseCase');
const AddFoodUseCase = require('../Applications/use_case/AddFoodUseCase');
const GetFoodUseCase = require('../Applications/use_case/GetFoodUseCase');
const EditFoodUseCase = require('../Applications/use_case/EditFoodUseCase');
const DeleteFoodUseCase = require('../Applications/use_case/DeleteFoodUseCase');

const serviceInstanceContainer = {
  userRepository: new UserRepositoryPostgres(pool, nanoid),
  foodRepository: new FoodRepositoryPostgres(pool, nanoid),
  authenticationRepository: new AuthenticationRepositoryPostgres(pool),
  passwordHash: new BcryptPasswordHash(bcrypt),
  authenticationTokenManager: new JwtTokenManager(Jwt.token),
};

const useCaseInstanceContainer = {
  addUserUseCase: new AddUserUseCase({
    userRepository: serviceInstanceContainer.userRepository,
    passwordHash: serviceInstanceContainer.passwordHash,
  }),
  addFoodUseCase: new AddFoodUseCase({
    foodRepository: serviceInstanceContainer.foodRepository,
  }),
  getFoodUseCase: new GetFoodUseCase({
    foodRepository: serviceInstanceContainer.foodRepository,
  }),
  editFoodUseCase: new EditFoodUseCase({
    foodRepository: serviceInstanceContainer.foodRepository,
  }),
  deleteFoodUseCase: new DeleteFoodUseCase({
    foodRepository: serviceInstanceContainer.foodRepository,
    userRepository: serviceInstanceContainer.userRepository,
  }),
  loginUserUseCase: new LoginUserUseCase({
    authenticationRepository: serviceInstanceContainer.authenticationRepository,
    authenticationTokenManager: serviceInstanceContainer.authenticationTokenManager,
    userRepository: serviceInstanceContainer.userRepository,
    passwordHash: serviceInstanceContainer.passwordHash,
  }),
  refreshAuthenticationUseCase: new RefreshAuthenticationUseCase({
    authenticationRepository: serviceInstanceContainer.authenticationRepository,
    authenticationTokenManager: serviceInstanceContainer.authenticationTokenManager,
  }),
  logoutUserUseCase: new LogoutUserUseCase({
    authenticationRepository: serviceInstanceContainer.authenticationRepository,
  }),
};

module.exports = {
  ...serviceInstanceContainer,
  ...useCaseInstanceContainer,
}