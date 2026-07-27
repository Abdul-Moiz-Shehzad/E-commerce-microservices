"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.validateRequest = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                res.status(constants_1.HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    error: 'Validation Error',
                    details: err.errors.map((e) => ({
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
exports.validateRequest = validateRequest;
const errorHandler = (err, _req, res, _next) => {
    console.error('Unhandled Error:', err);
    res.status(err.status || constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: err.message || 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
