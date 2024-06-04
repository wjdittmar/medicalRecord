import express from "express";
import Diagnosis from "../models/diagnosis.js";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/:id", async (request, response) => {
	try {
		const diagnosis = await Diagnosis.find({ icdcode: request.params.id });
		response.json(diagnosis);
	} catch (error) {
		response.status(500).json({ error: "Internal server error" });
	}
});

export default diagnosisRouter;
