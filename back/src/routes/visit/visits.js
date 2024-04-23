const visitRouter = require("express").Router();
const Visit = require("../../models/visit");
const jwt = require("jsonwebtoken");
const schema = require("./visitSchema");

visitRouter.get("/", (request, response) => {
	Visit.find({}).populate("patient", { firstName: 1, lastName: 1 }).then(provider => {
		response.json(provider);
	});
});

visitRouter.post("/", async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" });
	}

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


module.exports = visitRouter;