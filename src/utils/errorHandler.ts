import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
    let err = { ...error };
    err.message = error.message;

    // Mongoose bad ObjectId
    if (error.name === 'CastError') {
        const message = 'Resource not found';
        err = new AppError(message, 404);
    }

    // Mongoose duplicate key
    if (error.code === 11000) {
        const message = 'Duplicate field value entered';
        err = new AppError(message, 400);
    }

    // Mongoose validation error
    if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map((val: any) => val.message).join(', ');
        err = new AppError(message, 400);
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
};