import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError, ZodIssue } from 'zod';
import { HTTP_STATUS } from '../constants';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: 'Validation Error',
          details: err.errors.map((e: ZodIssue) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }
      next(err);
    }
  };
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('Unhandled Error:', err);
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
};
