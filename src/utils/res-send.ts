import { Response } from 'express';
// Success status
const STATUS_GET_SUCCESS = 200;
const STATUS_CREATE_SUCCESS = 201;
const STATUS_UPDATE_SUCCESS = 200;
const STATUS_DELETE_SUCCESS = 200;

// Error status
const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_BAD_REQUEST_ERROR = 400;

// Common messages
const MESSAGE_SUCCESS = 'Success';
const MESSAGE_ERROR = 'Error';
const MESSAGE_BAD_REQUEST_ERROR = 'Bad request';

// ===========================  SUCCESS RESPONSE: ===========================
/**
 * Send success response to client:
 * @param {any} res
 * @param {Object} [config]
 * @param {number} [config.status] - Response status code
 * @param {string} [config.message]
 * @param {any} [config.data] - Data that sent to client
 */
const sendSuccess = (
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: { status?: number; data?: any; message?: string }
) => {
  res.status(config.status || STATUS_GET_SUCCESS).json({
    result: config.message || MESSAGE_SUCCESS,
    data: config.data || null
  });
};

/**
 * Send success GET response to client:
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendGetSuccess = (res: Response, data: any, message?: string) => {
  sendSuccess(res, {
    status: STATUS_GET_SUCCESS,
    message: message || MESSAGE_SUCCESS,
    data
  });
};

/**
 * Send success POST response to client:
 * @param {*} res
 * @param {*} data
 * @param {string?} message
 */
const sendPostSuccess = (res: Response, data: any, message?: string) => {
  sendSuccess(res, {
    status: STATUS_CREATE_SUCCESS,
    message: message || MESSAGE_SUCCESS,
    data
  });
};

/**
 * Send success PUT response to client:
 * @param {*} res
 * @param {*} data
 * @param {string?} message
 */
const sendPutSuccess = (res: Response, data: any, message?: string) => {
  sendSuccess(res, {
    status: STATUS_UPDATE_SUCCESS,
    message: message || MESSAGE_SUCCESS,
    data
  });
};

/**
 * Send success DELETE response to client:
 * @param {*} res
 * @param {*} data
 * @param {string?} message
 */
const sendDeleteSuccess = (res, message) => {
  sendSuccess(res, {
    status: STATUS_DELETE_SUCCESS,
    message: message || MESSAGE_SUCCESS
  });
};

// ============================  ERROR RESPONSE: ============================
/**
 * Send error response to client:
 * @param {any} res
 * @param {Object} err
 * @param {number} err.status
 * @param {string} err.message
 */
const sendError = (res: Response, err: any) => {
  const statusCode = err?.status || STATUS_INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: err?.message || MESSAGE_ERROR
    }
  });
};

/**
 * Send bad request error (400) response to client:
 * @param {any} res Middleware's response
 * @param {string | string[]} message
 */
const sendBadRequestError = (res: Response, message: string) => {
  sendError(res, {
    status: STATUS_BAD_REQUEST_ERROR,
    message: message || MESSAGE_BAD_REQUEST_ERROR
  });
};

export {
  sendSuccess,
  sendGetSuccess,
  sendPostSuccess,
  sendPutSuccess,
  sendDeleteSuccess,
  sendError,
  sendBadRequestError
};
