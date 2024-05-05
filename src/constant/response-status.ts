const SUCCESS_GET = {
  status: 200,
  message: 'Success'
} as const;

const SUCCESS_CREATE = {
  status: 201,
  message: 'Created'
} as const;

const SUCCESS_UPDATE = {
  status: 200,
  message: 'Update'
} as const;

const SUCCESS_DELETE = {
  status: 200,
  message: 'Deleted'
} as const;

const ERROR_BAD_REQUEST = {
  status: 400,
  message: 'Bad request'
};

const ERROR_UNAUTHENTICATED = {
  status: 401,
  message: 'Unauthenticated'
};

const ERROR_UNAUTHORIZED = {
  status: 403,
  message: 'Unauthorized'
};

const ERROR_INTERNAL_SERVER = {
  status: 500,
  message: 'Internal error'
};

export {
  SUCCESS_GET,
  SUCCESS_CREATE,
  SUCCESS_UPDATE,
  SUCCESS_DELETE,
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHENTICATED,
  ERROR_UNAUTHORIZED,
  ERROR_INTERNAL_SERVER
};
