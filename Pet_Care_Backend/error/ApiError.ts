export default class ApiError {
  code: number;
  message: string;
  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  static badRequestError(errorMessage: string) {
    return new ApiError(400, errorMessage || 'Bad request');
  }

  static internalError(errorMessage: string) {
    return new ApiError(500, errorMessage || 'Internal server error');
  }

  static unauthorizedError(errorMessage: string) {
    return new ApiError(401, errorMessage || 'Unauthorized');
  }

  static forbiddenError(errorMessage: string) {
    return new ApiError(403, errorMessage || 'Forbidden');
  }

  static notFoundError(errorMessage: string) {
    return new ApiError(404, errorMessage || 'Not found');
  }

  static duplicateEntryError(errorMessage: string) {
    return new ApiError(409, errorMessage || 'User with entry already exists');
  }
}
