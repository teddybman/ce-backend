const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/users endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  describe('when POST /users', () => {
    xit('should response 201 and persisted user', async () => {
      // Arange
      const requestPayload = {
        username: 'user',
        fullname: 'username',
        email: 'my@email.com',
        password: 'secret_password',
        level: 1,
      };
    //   const server = await createServer(container);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedUser).toBeDefined()
    });

    it('should response 400 when request payload not contain needed property', async() => {
      // Arange
      const requestPayload = {
        user: 'user',
        fullname: 'username',
        email: 'my@email.com',
        password: 'secret_password',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('unable to create new user, not contain needed property')
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        username: 'user',
        fullname: 'username',
        email: 'my@email.com',
        password: 123,
        level: 1
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assets
      const responseJson = JSON.parse(response.payload);
      // console.log(`responseJson : ${responseJson.message}`);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('unable to create new user, not meet data type specification');
    })

    it('should response 400 when username more than 50 character', async () => {
      // Arrange
      const requestPayload = {
        username: 'useruseruseruseruseruseruseruseruseruseruseruseruseruseruser',
        fullname: 'username',
        email: 'my@email.com',
        password: 'secret_password',
        level: 1
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assets
      const responseJson = JSON.parse(response.payload);
      // console.log(`responseJson : ${responseJson.message}`);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('unable to create new user, character limit exceeded');
    })

    it('should response 400 when username contain restricted character', async () => {
      // Arrange
      const requestPayload = {
        username: 'user mine',
        fullname: 'username',
        email: 'my@email.com',
        password: 'secret_password',
        level: 1
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assets
      const responseJson = JSON.parse(response.payload);
      // console.log(`responseJson : ${responseJson.message}`);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('unable to create user, contain restricted character');
    });
  });
});