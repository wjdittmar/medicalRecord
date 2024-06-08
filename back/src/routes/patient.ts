import { Router } from "express";
import { verifyToken, verifyTokenAndRole } from "../middleware/authMiddleware";
import * as patientController from "../controllers/patientController";

const patientRouter = Router();

// Endpoint to get the total number of patients
patientRouter.get("/total", verifyTokenAndRole(["admin", "provider"]), patientController.getTotalPatients);

// Endpoint to get the number of patients older than a specified age
patientRouter.get("/older-than", verifyTokenAndRole(["admin", "provider"]), patientController.getPatientsOlderThan);

// Endpoint to get all patients
patientRouter.get("/", verifyTokenAndRole(["admin", "provider"]), patientController.getAllPatients);

// Endpoint to find patients by demographic data
patientRouter.get("/search", verifyToken, patientController.findPatientsByDemographic);

// Endpoint to create a new patient
patientRouter.post("/", verifyTokenAndRole(["admin", "provider"]), patientController.createPatient);

// Endpoint to update a patient
patientRouter.put("/:id", verifyTokenAndRole(["admin", "provider"]), patientController.updatePatient);

export default patientRouter;
