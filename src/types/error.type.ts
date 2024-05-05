import {
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHENTICATED,
  ERROR_UNAUTHORIZED
} from '@/constant';

class BadRequestError extends Error {
  status: number;
  message: string;
  constructor(message?: string) {
    super();
    this.status = ERROR_BAD_REQUEST.status;
    this.message = message || ERROR_BAD_REQUEST.message;
  }
}

class UnAuthenticatedError extends Error {
  status: number;
  message: string;
  constructor(message?: string) {
    super();
    this.status = ERROR_UNAUTHENTICATED.status;
    this.message = message || ERROR_UNAUTHENTICATED.message;
  }
}

class UnAuthorizedError extends Error {
  status: number;
  message: string;
  constructor(message?: string) {
    super();
    this.status = ERROR_UNAUTHORIZED.status;
    this.message = message || ERROR_UNAUTHORIZED.message;
  }
}

export { BadRequestError, UnAuthenticatedError, UnAuthorizedError };
