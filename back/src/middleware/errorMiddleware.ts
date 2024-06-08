import { Request, Response } from "express";
import { logError } from "../services/loggerService";

// Define a custom error type with optional statusCode
interface CustomError extends Error {
	statusCode?: number;
}

const errorMiddleware = (err: CustomError, req: Request, res: Response): void => {
	logError(err.message, err);

	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	res.status(statusCode).json({ error: message });
};

export default errorMiddleware;
