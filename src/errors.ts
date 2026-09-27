export class ApiError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class InvalidResponseError extends Error {
  constructor(message = 'Invalid response from external api') {
    super(message)
  }
}
