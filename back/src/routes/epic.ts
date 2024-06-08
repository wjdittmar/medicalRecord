import express, { Request, Response } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { fetchPatientData, fetchConditions, fetchDocumentReferences, getNotesByType } from "../services/epicService";
import { getFormattedDate } from "../utils/date";
import { logError } from "../services/loggerService";

const epicRouter = express.Router();

// Define the interface for the query parameters
interface EpicQueryParams {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
}

epicRouter.get("/", verifyToken, async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, dateOfBirth } = req.query as unknown as EpicQueryParams;

		// Ensure all required query parameters are present
		if (!firstName || !lastName || !dateOfBirth) {
			res.status(400).json({ error: "Missing required query parameters" });
			return;
		}

		const formattedDateOfBirth = getFormattedDate(new Date(dateOfBirth));

		const patientData = await fetchPatientData(firstName, lastName, formattedDateOfBirth);
		const patientId = patientData.entry[0].link[0].url.split("/").pop();

		if (!patientId) {
			res.status(500).json({ error: "Failed to extract patient ID" });
			return;
		}

		const conditions = await fetchConditions(patientId);

		const documentReferences = await fetchDocumentReferences(patientId);
		const progressNotes = await getNotesByType(documentReferences, "Progress Notes");

		res.status(200).json({ progressNotes, conditions });
	} catch (error) {
		if (error instanceof Error) {
			logError("Error fetching patient data:", error.message);
		}
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export default epicRouter;
