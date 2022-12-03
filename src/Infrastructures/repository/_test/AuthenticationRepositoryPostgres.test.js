const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const pool = require('../../database/postgres/pool');
const AuthenticationRepositoryPostgres = require('../AuthenticationRepositoryPostgres');

describe('AuthenticationRepository postgres', () => {
  it('should be instance of AuthenticationRepository domain', () => {
    const authenticationsRepository = new AuthenticationRepositoryPostgres();
    expect(authenticationsRepository).toBeInstanceOf(AuthenticationRepository);
  });

  describe('behaviour test', () => {
    afterEach(async () => {
      await AuthenticationsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
      await pool.end();
    });

    describe('addToken function', () => {
      it('should add token to database', async () => {
        // Arrange
        const authenticationsRepository = new AuthenticationRepositoryPostgres(pool);
        const token = 'token';

        // Action
        await authenticationsRepository.addToken(token);

        // Assert
        const tokens = await AuthenticationsTableTestHelper.findToken('token');
        expect(tokens).toHaveLength(1);
        expect(tokens[0].token).toBe(token);
      });
    });

    describe('checkAvailabilityToken function', () => {
      it('should throw InvariantError if token not available', async () => {
        // Arrange
        const authenticationsRepository = new AuthenticationRepositoryPostgres(pool);
        const token = 'token';

        // Action & Assert
        await expect(authenticationsRepository.checkAvailabilityToken(token))
          .rejects.toThrow(InvariantError);
      });

      it('should not throw InvariantError if token available', async () => {
        // Arrange
        const authenticationsRepository = new AuthenticationRepositoryPostgres(pool);
        const token = 'token';
        await AuthenticationsTableTestHelper.addToken(token);

        // Action & Assert
        await expect(authenticationsRepository.checkAvailabilityToken(token))
          .resolves.not.toThrow(InvariantError);
      });
    });

    describe('deleteToken', () => {
      it('should delete token from database', async () => {
        // Arrange
        const authenticationsRepository = new AuthenticationRepositoryPostgres(pool);
        const token = 'token';

        // Action
        await authenticationsRepository.deleteToken(token);

        // Assert
        const tokens = await AuthenticationsTableTestHelper.findToken(token);
        expect(tokens).toHaveLength(0);
      })
    })
  })
})