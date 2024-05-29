const epicRouter = require("express").Router();
const { verifyToken } = require("../middleware/authMiddleware");
const epicService = require("../services/epicService");
const { getFormattedDate } = require("../utils/date");
const loggerService = require("../services/loggerService");

epicRouter.get("/", verifyToken, async (request, response) => {
	try {
		const firstName = request.query.firstName;
		const lastName = request.query.lastName;
		const dateOfBirth = getFormattedDate(new Date(request.query.dateOfBirth));

		const patientData = await epicService.fetchPatientData(firstName, lastName, dateOfBirth);
		const patientId = patientData.entry[0].link[0].url.split("/").pop();

		const conditions = await epicService.fetchConditions(patientId);

		const documentReferences = await epicService.fetchDocumentReferences(patientId);
		const progressNotes = await epicService.getNotesByType(documentReferences, "Progress Notes");

		response.status(200).json({ progressNotes, conditions });
	} catch (error) {
		loggerService.logError("Error fetching patient data:", error.message);
		response.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = epicRouter;
