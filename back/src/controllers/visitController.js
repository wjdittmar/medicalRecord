const Visit = require("../models/visit/visit");
const schema = require("../models/visit/visitSchema");
const loggerService = require("../services/loggerService");
const handleError = require("../utils/errorHandler");
const { getDayRange } = require("../utils/date");

// Get all visits
const getAllVisits = async (request, response) => {
	try {
		const visits = await Visit.find({})
			.populate({
				path: "patient",
				populate: {
					path: "user",
					select: "name"
				}
			});
		response.json(visits);
	} catch (error) {
		handleError(response, error);
	}
};

// Create a new visit
const createVisit = async (request, response) => {
	const body = request.body;

	const { error, value } = schema.validate(body);

	if (error) {
		const { details } = error;
		return response.status(422).json({
			success: false,
			result: null,
			message: details[0]?.message,
		});
	}

	const visit = new Visit({
		patient: body.patient,
		address: body.address,
		encounterDate: body.encounterDate,
		providerNotes: body.providerNotes
	});

	try {
		const savedVisit = await visit.save();
		loggerService.logInfo("Created new visit", { patient: body.patient, encounterDate: body.encounterDate });
		response.status(201).json(savedVisit);
	} catch (error) {
		handleError(response, error);
	}
};

// Get total number of visits
const getTotalVisits = async (request, response) => {
	try {
		const totalVisits = await Visit.countDocuments();
		response.json({ totalVisits });
	} catch (error) {
		handleError(response, error);
	}
};

// Get visits between specified dates
const getVisitsBetweenDates = async (request, response) => {
	try {
		const startDate = new Date(request.query.startDate);
		const endDate = new Date(request.query.endDate);

		if (Object.prototype.toString.call(startDate) !== "[object Date]") {
			return response.status(400).json({ error: "Invalid start date" });
		}
		if (Object.prototype.toString.call(endDate) !== "[object Date]") {
			return response.status(400).json({ error: "Invalid end date" });
		}
		const visitsBetween = await Visit.countDocuments({ encounterDate: { $gt: startDate } });
		response.json({ visitsBetween });
	} catch (error) {
		handleError(response, error);
	}
};

// Update a visit
const updateVisit = async (request, response) => {
	const id = request.params.id;
	const body = request.body;

	try {
		// Find the visit by id
		const updatedVisit = await Visit.findByIdAndUpdate(id, {
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
			return response.status(404).json({ error: "Visit not found" });
		}

		response.status(200).json(updatedVisit);
	} catch (error) {
		handleError(response, error);
	}
};

const findVisit = async (request, response) => {

	const { encounterDate, postalCode } = request.query;
	const query = {};

	if (encounterDate) {
		// the encounter date will be provided in the user's local timezone
		const { startOfDay, endOfDay } = getDayRange(encounterDate);
		query.encounterDate = { $gte: startOfDay, $lte: endOfDay };
	}
	if (postalCode) {
		query["address.postalCode"] = postalCode;
	}
	try {
		const visits = await Visit.find(query)
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
		response.json(visits);
	} catch (error) {
		handleError(response, error);
	}
};

const getVisitsByProvider = async (request, response) => {
	const providerId = request.params.providerId;

	try {
		const visits = await Visit.find({ provider: providerId })
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
			return response.status(404).json({ error: "No visits found for this provider" });
		}



		response.status(200).json(visits);
	} catch (error) {
		handleError(response, error);
	}
};

module.exports = {
	getAllVisits,
	createVisit,
	getTotalVisits,
	getVisitsBetweenDates,
	updateVisit,
	findVisit,
	getVisitsByProvider
};
