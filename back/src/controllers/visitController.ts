import { Request, Response } from "express";
import VisitModel from "../models/visit/visit";
import schema from "../models/visit/visitSchema";
import { logInfo } from "../services/loggerService";
import handleError from "../utils/errorHandler";
import { getDayRange } from "../utils/date";

// Get all visits
export const getAllVisits = async (req: Request, res: Response): Promise<void> => {
	try {
		const visits = await VisitModel.find({})
			.populate({
				path: "patient",
				populate: {
					path: "user",
					select: "name"
				}
			});
		res.json(visits);
	} catch (error) {
		handleError(res, error);
	}
};

// Create a new visit
export const createVisit = async (req: Request, res: Response): Promise<void> => {
	const body = req.body;

	const { error, value: visitValue } = schema.validate(body);

	if (error) {
		const { details } = error;
		res.status(422).json({
			success: false,
			result: null,
			message: details[0]?.message,
		});
		return;
	}

	console.log(visitValue);
	const visit = new VisitModel({
		patient: body.patient,
		address: body.address,
		encounterDate: body.encounterDate,
		providerNotes: body.providerNotes
	});

	try {
		const savedVisit = await visit.save();
		logInfo("Created new visit", { patient: body.patient, encounterDate: body.encounterDate });
		res.status(201).json(savedVisit);
	} catch (error) {
		handleError(res, error);
	}
};

// Get total number of visits
export const getTotalVisits = async (req: Request, res: Response): Promise<void> => {
	try {
		const totalVisits = await VisitModel.countDocuments();
		res.json({ totalVisits });
	} catch (error) {
		handleError(res, error);
	}
};

// Get visits between specified dates
export const getVisitsBetweenDates = async (req: Request, res: Response): Promise<void> => {
	try {
		const startDate = new Date(req.query.startDate as string);
		const endDate = new Date(req.query.endDate as string);

		if (Object.prototype.toString.call(startDate) !== "[object Date]") {
			res.status(400).json({ error: "Invalid start date" });
		}
		if (Object.prototype.toString.call(endDate) !== "[object Date]") {
			res.status(400).json({ error: "Invalid end date" });
		}
		const visitsBetween = await VisitModel.countDocuments({ encounterDate: { $gt: startDate, $lt: endDate } });
		res.json({ visitsBetween });
	} catch (error) {
		handleError(res, error);
	}
};

// Update a visit
export const updateVisit = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const body = req.body;

	try {
		// Find the visit by id
		const updatedVisit = await VisitModel.findByIdAndUpdate(id, {
			encounterDate: body.encounterDate,
			address: body.address,
			providerNotes: body.providerNotes,
			provider: body.provider
		}, { new: true }
		).populate({
			path: "patient",
			populate: {
				path: "user",
				select: "name email phone"
			}
		}).populate({
			path: "provider",
			populate: {
				path: "user",
				select: "name email"
			}
		});

		if (!updatedVisit) {
			res.status(404).json({ error: "Visit not found" });
		}

		res.status(200).json(updatedVisit);
	} catch (error) {
		handleError(res, error);
	}
};

export const findVisit = async (req: Request, res: Response): Promise<void> => {
	const { encounterDate, postalCode } = req.query;
	const query: any = {};

	if (encounterDate) {
		// the encounter date will be provided in the user's local timezone
		const { startOfDay, endOfDay } = getDayRange(encounterDate as string);
		query.encounterDate = { $gte: startOfDay, $lte: endOfDay };
	}
	if (postalCode) {
		query["address.postalCode"] = postalCode;
	}
	try {
		const visits = await VisitModel.find(query)
			.populate({
				path: "patient",
				populate: {
					path: "user",
					select: "name email phone"
				}
			}).populate({
				path: "provider",
				populate: {
					path: "user",
					select: "name email"
				}
			})
			.lean(); // Use lean to get plain JavaScript objects instead of Mongoose documents
		res.json(visits);
	} catch (error) {
		handleError(res, error);
	}
};

export const getVisitsByProvider = async (req: Request, res: Response): Promise<void> => {
	const providerId = req.params.providerId;

	try {
		const visits = await VisitModel.find({ provider: providerId })
			.populate({
				path: "patient",
				populate: {
					path: "user",
					select: "name email phone"
				}
			})
			.populate({
				path: "provider",
				populate: {
					path: "user",
					select: "name email"
				}
			});

		if (!visits.length) {
			res.status(404).json({ error: "No visits found for this provider" });
		}

		res.status(200).json(visits);
	} catch (error) {
		handleError(res, error);
	}
};

export default {
	getAllVisits,
	createVisit,
	getTotalVisits,
	getVisitsBetweenDates,
	updateVisit,
	findVisit,
	getVisitsByProvider
};
