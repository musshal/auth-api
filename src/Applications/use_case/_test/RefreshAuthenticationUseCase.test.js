const { use } = require('bcrypt/promises');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase');

describe('RefreshAuthenticationUseCase', () => {
  it('should orchestrating the refresh token action correctly', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 'some_refresh_token',
    };

    /* creating dependency of use case */
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    /* mocking needed function */
    mockAuthenticationRepository.checkAvailabilityToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.verifyRefreshToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ username: 'dicoding' }));
    mockAuthenticationTokenManager.createAccessToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve('some_new_access_token'));

    /* creating use case instance */
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const accessToken = await refreshAuthenticationUseCase.execute(
      useCasePayload,
    );

    // Assert
    expect(mockAuthenticationTokenManager.verifyRefreshToken).toBeCalledWith(
      useCasePayload.refreshToken,
    );
    expect(mockAuthenticationRepository.checkAvailabilityToken).toBeCalledWith(
      useCasePayload.refreshToken,
    );
    expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(
      useCasePayload.refreshToken,
    );
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({
      username: 'dicoding',
    });
    expect(accessToken).toEqual('some_new_access_token');
  });

  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = {};
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

    // Action and Assert
    await expect(
      refreshAuthenticationUseCase.execute(useCasePayload),
    ).rejects.toThrowError(
      'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN',
    );
  });

  it('should throw error if refresh token not string', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 1,
    };

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

    // Action and Assert
    await expect(
      refreshAuthenticationUseCase.execute(useCasePayload),
    ).rejects.toThrowError(
      'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPESIFICATION',
    );
  });
});
