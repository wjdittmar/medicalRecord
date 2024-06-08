import mongoose from "mongoose";
import { MONGODB_URI } from "./config";
import * as loggerService from "../services/loggerService";

const url = MONGODB_URI;

mongoose.set("strictQuery", false);

export async function connectDB(): Promise<void> {
	try {
		await mongoose.connect(url);
		loggerService.logInfo("Connected to MongoDB");
	} catch (error) {
		if (error instanceof Error) {
			loggerService.logError("Error connecting to MongoDB:", error.message);
		}
		throw error; // Propagate the error to the caller
	}
}

export async function disconnectDB(): Promise<void> {
	try {
		await mongoose.disconnect();
		loggerService.logInfo("Disconnected from MongoDB");
	} catch (error) {
		if (error instanceof Error) {
			loggerService.logError("Error disconnecting from MongoDB:", error.message);
		}
		throw error; // Propagate the error to the caller
	}
}
