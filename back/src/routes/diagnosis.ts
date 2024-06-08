import express, { Request, Response } from "express";
import Diagnosis from "../models/diagnosis";

const diagnosisRouter = express.Router();

interface DiagnosisRequestParams {
	id: string;
}

diagnosisRouter.get("/:id", async (request: Request<DiagnosisRequestParams>, response: Response) => {
	try {
		const diagnosis = await Diagnosis.find({ icdcode: request.params.id });
		response.json(diagnosis);
	} catch (error) {
		response.status(500).json({ error: "Internal server error" });
	}
});

export default diagnosisRouter;
