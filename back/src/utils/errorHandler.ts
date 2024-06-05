import { Response } from "express";
import { logError } from "../services/loggerService";

// Extend Error to create a custom error type
interface ExtendedError extends Error {
	code?: number;
	keyPattern?: Record<string, unknown>;
}

const isExtendedError = (error: any): error is ExtendedError => {
	return error && typeof error === 'object' && 'message' in error;
};

const handleError = (
	response: Response,
	error: unknown,
	statusCode: number = 500,
	customMessage: string = "Internal server error"
): Response => {
	if (isExtendedError(error)) {
		if (error.code && error.code === 11000) {
			// Extract the field causing the duplicate key error
			const fieldName = Object.keys(error.keyPattern || {}).join(", ");
			const message = `Duplicate key error: A record with this key (${fieldName}) already exists.`;
			logError(message, error);
			return response.status(409).json({ message });
		}

		const message = error.message || customMessage;
		logError(message, error);
		return response.status(statusCode).json({ message });
	}

	// Handle cases where the error is not an ExtendedError
	const message = customMessage;
	logError(message, error);
	return response.status(statusCode).json({ message });
};

export default handleError;
