import type { ContentfulStatusCode } from 'hono/utils/http-status'

export class AppError extends Error {
  constructor(message: string, public status: ContentfulStatusCode) {
    super(message)
  }
}

export class ApiError extends AppError {
  constructor(message: string) {
    super(message, 502)
  }
}

export class InvalidResponseError extends AppError {
  constructor(message = 'Invalid response from external api') {
    super(message, 502)
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400)
  }
}
