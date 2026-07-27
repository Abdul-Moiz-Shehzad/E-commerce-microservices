import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
export declare const validateRequest: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
export declare const errorHandler: (err: any, _req: Request, res: Response, _next: NextFunction) => void;
