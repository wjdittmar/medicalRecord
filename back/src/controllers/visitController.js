const Visit = require("../models/visit/visit");
const schema = require("../models/visit/visitSchema");
const loggerService = require("../services/loggerService");
const handleError = require("../utils/errorHandler");

// Get all visits
const getAllVisits = async (request, response) => {
	try {
		const visits = await Visit.find({})
			.populate({
				path: 'patient',
				populate: {
					path: 'user',
					select: 'name'
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

		if (Object.prototype.toString.call(startDate) !== '[object Date]') {
			return response.status(400).json({ error: "Invalid start date" });
		}
		if (Object.prototype.toString.call(endDate) !== '[object Date]') {
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
			providerNotes: body.providerNotes
		}, { new: true }
		);

		if (!updatedVisit) {
			return response.status(404).json({ error: "Visit not found" });
		}

		response.status(200).json(updatedVisit);
	} catch (error) {
		handleError(response, error);
	}
};

module.exports = {
	getAllVisits,
	createVisit,
	getTotalVisits,
	getVisitsBetweenDates,
	updateVisit
};
