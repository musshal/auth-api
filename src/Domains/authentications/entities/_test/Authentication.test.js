const Authentication = require('../Authentication');

describe('NewAuth entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken',
    };

    // Action and Assert
    expect(() => new Authentication(payload)).toThrowError(
      'AUTHENTICATION.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type spesification', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 1234,
    };

    // Action and Assert
    expect(() => new Authentication(payload)).toThrowError(
      'AUTHENTICATION.NOT_MEET_DATA_TYPE_SPESIFICATION',
    );
  });

  it('should create Authentication object correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    // Action
    const authentication = new Authentication(payload);

    // Assert
    expect(authentication).toBeInstanceOf(Authentication);
    expect(authentication.accessToken).toEqual(payload.accessToken);
    expect(authentication.refreshToken).toEqual(payload.refreshToken);
  });
});
