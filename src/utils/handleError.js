import { respond } from "./respond.js";
export class ValidationError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = 'ValidationError';
        this.details = details;
        this.code = details.code || 'VALIDATION_ERROR';
        this.status = 400;
    }
}
// =====================================================
// SERVICE LAYER :
// =====================================================
export class ServiceError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = 'ServiceError';
        this.details = details;
        this.code = details.code || 'SERVICE_ERROR';
        this.status = 503;
        this.originalError = details.originalError;
    }
}
// =====================================================
// Internal server :
// =====================================================
export class InternalServerError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = 'InternalServerError';
        this.details = details;
        this.code = details.code || 'INTERNAL_ERROR';
        this.status = 500;
    }
}


 const handleErrorWithContext = (logger) => (error, res, context = {}) => {
  // log the error with context
  logger.error(`Error: ${error.message}`, {
    stack: error.stack,
    ...context,
  });

  // send structured error response
  return respond(500)("Oops! Something went wrong")(res)({
    error: error.message,
    context,
  });
};

export {handleErrorWithContext}