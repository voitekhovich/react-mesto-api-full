class ServerError extends Error {
  constructor(message = 'На сервере произошла ошибка') {
    super(message);
    this.name = 'ServerError';
    this.statusCode = 500;
  }
}

module.exports = { ServerError };
