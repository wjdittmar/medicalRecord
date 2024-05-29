const patientRouter = require("express").Router();
const { verifyToken, verifyTokenAndRole } = require("../middleware/authMiddleware");
const patientController = require("../controllers/patientController");

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

module.exports = patientRouter;
