import { Request, Response } from "express";
import ProviderModel from "../models/provider/provider";
import UserModel from "../models/user/user";
import { createUser } from "./userController";
import { logInfo } from "../services/loggerService";
import handleError from "../utils/errorHandler";

// Get total number of providers
export const getTotalProviders = async (req: Request, res: Response): Promise<void> => {
	try {
		const totalProviders = await ProviderModel.countDocuments();
		res.json({ totalProviders });
	} catch (error) {
		handleError(res, error);
	}
};

// Get all providers
export const getAllProviders = async (req: Request, res: Response): Promise<void> => {
	try {
		const providers = await ProviderModel.find({}).populate("user", { email: 1, name: 1, phone: 1 });
		res.json(providers);
	} catch (error) {
		handleError(res, error);
	}
};

// Get total providers by state
export const getProvidersByState = async (req: Request, res: Response): Promise<void> => {
	try {
		const stateProviders = await ProviderModel.countDocuments({
			license: { $regex: req.query.state?.toString().toUpperCase() }
		});
		res.json({ stateProviders });
	} catch (error) {
		handleError(res, error);
	}
};

// Create a new provider
export const createProvider = async (req: Request, res: Response): Promise<void> => {
	const body = req.body;

	try {
		// Create a new user for the provider
		const savedUser = await createUser({ ...body, password: body.password, role: "provider" });

		const provider = new ProviderModel({
			user: savedUser._id,
			license: body.license,
		});

		const savedProvider = await provider.save();

		// Sanitize the logged data to avoid logging the password
		const sanitizedProvider = {
			...savedProvider.toObject(),
			user: {
				...savedProvider.user,
				password: undefined, // Remove the password
			},
		};

		logInfo("Created new provider", sanitizedProvider);

		res.status(201).json(savedProvider);
	} catch (error) {
		handleError(res, error);
	}
};

// Update a provider
export const updateProvider = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const body = req.body;

	try {
		// Find the provider by id
		const provider = await ProviderModel.findById(id);
		if (!provider) {
			res.status(404).json({ error: "Provider not found" });
			return;
		}

		// Update the user associated with the provider
		const updatedUser = await UserModel.findByIdAndUpdate(
			provider.user,
			{
				name: body.user.name,
				email: body.user.email,
				phone: body.user.phone,
			},
			{ new: true }
		);

		if (!updatedUser) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		// Update the provider's license
		provider.license = body.license;

		const updatedProvider = await provider.save();

		res.status(200).json(updatedProvider);
	} catch (error) {
		handleError(res, error);
	}
};
