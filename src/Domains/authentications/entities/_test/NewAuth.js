const NewAuth = require('../NewAuth');

describe('NewAuth entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken',
    };

    // Action and Assert
    expect(() => new NewAuth(payload)).toThrowError(
      'NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type spesification', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 1234,
    };

    // Action and Assert
    expect(() => new NewAuth(payload)).toThrowError(
      'NEW_AUTH.NOT_MEET_DATA_TYPE_SPESIFICATION',
    );
  });

  it('should create Authentication object correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    // Action
    const newAuth = new NewAuth(payload);

    // Assert
    expect(newAuth).toBeInstanceOf(NewAuth);
    expect(newAuth.accessToken).toEqual(payload.accessToken);
    expect(newAuth.refreshToken).toEqual(payload.refreshToken);
  });
});
