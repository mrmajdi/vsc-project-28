import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validator';
import logger from '../utils/logger';

interface CustomError extends Error {
  statusCode?: number;
  errors?: any[];
}

/**
 * Global error handling middleware.
 * Catches all errors passed to `next(err)` and sends a formatted JSON response.
 */
export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  // Default status code
  const statusCode = err.statusCode ?? 500;

  // Log error for server errors (5xx)
  if (statusCode >= 500) {
    logger.error(`[${new Date().toISOString()}] ${err.message}`, err);
  } else {
    logger.warn(`[${new Date().toISOString()}] ${err.message}`);
  }

  // Prepare response body
  const response: any = {
    error: {
      message: err.message || 'Internal Server Error',
      // Include validation errors if present
      ...(err.errors && { details: err.errors }),
    },
  };

  // In production, hide stack trace
  if (process.env.NODE_ENV !== 'production') {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;