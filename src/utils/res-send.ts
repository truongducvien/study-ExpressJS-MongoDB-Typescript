import {
  ERROR_INTERNAL_SERVER,
  SUCCESS_CREATE,
  SUCCESS_DELETE,
  SUCCESS_GET,
  SUCCESS_UPDATE
} from '@/constant';
import { Response } from 'express';

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
  res.status(config.status || SUCCESS_GET.status).json({
    result: config.message || SUCCESS_GET.message,
    data: config.data || null
  });
};

/**
 * Send success GET response to client:
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendGetSuccess = (res: Response, data: any, message?: string) => {
  sendSuccess(res, {
    status: SUCCESS_GET.status,
    message: message || SUCCESS_GET.message,
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
    status: SUCCESS_CREATE.status,
    message: message || SUCCESS_CREATE.message,
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
    status: SUCCESS_UPDATE.status,
    message: message || SUCCESS_UPDATE.message,
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
    status: SUCCESS_DELETE.status,
    message: message || SUCCESS_DELETE.message
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
  const statusCode: number =
    (err?.status as number) || ERROR_INTERNAL_SERVER.status;
  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: err?.message || ERROR_INTERNAL_SERVER.message
    }
  });
};

export {
  sendSuccess,
  sendGetSuccess,
  sendPostSuccess,
  sendPutSuccess,
  sendDeleteSuccess,
  sendError
};
