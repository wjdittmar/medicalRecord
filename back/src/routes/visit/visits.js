const visitRouter = require("express").Router();
const Visit = require("../../models/visit");
const schema = require("./visitSchema");
const { verifyToken } = require("../../utils/middleware");

visitRouter.get("/", verifyToken, (request, response) => {
	Visit.find({})
		.populate({
			path: 'patient',
			populate: {
				path: 'user',
				select: 'name'
			}
		})
		.then(visits => {
			response.json(visits);
		})
		.catch(err => {
			response.status(500).json({ error: err.message });
		});
});

visitRouter.post("/", verifyToken, async (request, response) => {
	const body = request.body;

	const { error, value } = schema.validate(body);

	const visit = new Visit({
		patient: body.patient,
		address: body.address,
		encounterDate: body.encounterDate,
		providerNotes: body.providerNotes
	});

	if (error) {
		const { details } = error;
		return response.status(422).json({
			success: false,
			result: null,
			message: details[0]?.message,
		});
	}

	const savedVisit = await visit.save();
	response.status(201).json(savedVisit);
});

// Endpoint to get the total number of patients
visitRouter.get("/total", verifyToken, async (request, response) => {
	try {
		const totalVisits = await Visit.countDocuments();
		response.json({ totalVisits });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

// Endpoint to get the number of patients older than a specified age
visitRouter.get("/date-between", verifyToken, async (request, response) => {
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
		response.status(500).json({ error: error.message });
	}
});




module.exports = visitRouter;