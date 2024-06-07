import { Request, Response } from "express";
import PatientModel, { PatientDocument } from "../models/patient/patient"; // Adjust the import path as necessary

import mongoose from "mongoose";
import UserModel from "../models/user/user";
import { Patient } from "types/patient";
import createUserSchema from "../models/user/createUserSchema";
import updateUserSchema from "../models/user/updateUserSchema";
import patientSchema from "../models/patient/patientSchema";
import { createUser } from "./userController";
import { getDayRange } from "../utils/date";
import { logInfo } from "../services/loggerService";
import handleError from "../utils/errorHandler";

// Get total number of patients
const getTotalPatients = async (request: Request, response: Response): Promise<void> => {
	try {
		const totalPatients = await PatientModel.countDocuments();
		response.json({ totalPatients });
	} catch (error) {
		handleError(response, error);
	}
};

// Get number of patients older than a specified age
const getPatientsOlderThan = async (request: Request, response: Response): Promise<void> => {
	try {
		const ageThreshold = parseInt(request.query.age as string); // Extract age threshold from query parameter
		if (isNaN(ageThreshold)) {
			response.status(400).json({ error: "Invalid age threshold" });
		}
		const currentDate = new Date();
		const thresholdDate = new Date(currentDate.getTime() - 1000 * 60 * 60 * 24 * 365 * ageThreshold);
		const patientsOlderThanThreshold = await PatientModel.countDocuments({ dob: { $lte: thresholdDate } });
		response.json({ patientsOlderThanThreshold });
	} catch (error) {
		handleError(response, error);
	}
};

// Get all patients
const getAllPatients = async (request: Request, response: Response): Promise<void> => {
	try {
		const patients = await PatientModel.find({})
			.populate("preExistingConditions", { icdcode: 1, disease: 1 })
			.populate("user", { email: 1, name: 1, phone: 1 });
		response.json(patients);
	} catch (error) {
		handleError(response, error);
	}
};

// this will only be used here
// and represents a selection of fields from the user type
type UserQuery = {
	name?: string | RegExp;
};

type PatientQuery = Partial<Pick<Patient, "ssn" | "address">> & {
	dob?: Date | { $gte?: Date; $lte?: Date };
	"address.postalCode"?: string;
	user?: { $in: mongoose.Types.ObjectId[] };
};

// Find patients by demographic data
const findPatientsByDemographic = async (req: Request, res: Response): Promise<void> => {

	const { name, ssn, dob, postalCode } = req.query as {
		name?: string;
		ssn?: string;
		dob?: string;
		postalCode?: string;
	};

	const patientQuery: PatientQuery = {};

	if (ssn) {
		patientQuery.ssn = ssn;
	}
	if (dob) {
		const { startOfDay, endOfDay } = getDayRange(dob);
		patientQuery.dob = { $gte: startOfDay, $lte: endOfDay };
	}
	if (postalCode) {
		patientQuery["address.postalCode"] = postalCode;
	}

	try {
		// If name is provided, find matching users
		if (name) {

			const userQuery: UserQuery = { name: new RegExp(name, "i") }; // Case-insensitive regex search for name

			const users = await UserModel.find(userQuery, "_id").lean();
			const userIds = users.map((user) => user._id);

			// Add user IDs to the patient query
			patientQuery.user = { $in: userIds };
		}

		const patients = await PatientModel.find(patientQuery)
			.populate("user", "email name phone")
			.populate("preExistingConditions", { icdcode: 1, disease: 1 })
			.lean(); // Use lean to get plain JavaScript objects instead of Mongoose documents

		res.json(patients);
	} catch (error) {
		handleError(res, error);
	}
};

// Create a new patient
const createPatient = async (request: Request, response: Response): Promise<void> => {
	try {
		const { name, phone, email, password, address } = request.body;
		const { preferredLanguage, dob, sex, ssn } = request.body;

		// TODO: implement additional countries
		// assume US-only, for now
		const modifiedAddress = { ...address, country: "US" };

		// when you create a new patient,
		// you must also create a new user

		const { value: userValue, error: userError } = createUserSchema.validate({
			email,
			name,
			phone,
			password,
			role: "patient",
		});
		if (userError) {
			handleError(response, userError, 400, userError.details[0].message);
			return;
		}

		const savedUser = await createUser(userValue);

		const patientValidation = patientSchema.validate({
			user: savedUser._id.toString(),
			preferredLanguage,
			dob,
			sex,
			ssn,
			address: modifiedAddress,
		});

		if (patientValidation.error) {
			handleError(
				response,
				patientValidation.error,
				400,
				patientValidation.error.details[0].message
			);
			return;
		}

		const patient = new PatientModel(patientValidation.value);

		const savedPatient = await patient.save();
		logInfo("Created new patient", { name, email });
		response.status(201).json(savedPatient);
	} catch (error) {
		handleError(response, error);
	}
};

// Update a patient
const updatePatient = async (request: Request, response: Response): Promise<void> => {
	const id = request.params.id;
	const body = request.body;

	try {
		// have to add lean otherwise it adds the __parent field and messes up validation
		const patient = await PatientModel.findById(id).populate("preExistingConditions").lean();

		if (!patient) {
			handleError(response, new Error("Patient not found"), 404, "Patient not found");
			return;
		}

		const { value: userValue, error: userError } = updateUserSchema.validate({
			name: body.user.name,
			email: body.user.email,
			phone: body.user.phone,
		});

		if (userError) {
			// TODO: need to handle this error gracefully on the front end when you try to update the values to something invalid
			handleError(response, userError, 400, userError.details[0].message);
			return;
		}

		// Update the user associated with the patient
		const updatedUser = await UserModel.findByIdAndUpdate(patient.user, userValue, { new: true });

		if (!updatedUser) {
			response.status(404).json({ error: "User not found" });
			return;
		}
		// Convert ObjectId to string before validation
		const patientData = {
			...patient,
			user: patient.user.toString(),
		};

		// Update other patient fields
		patientData.dob = body.dob;
		patientData.ssn = body.ssn;
		patientData.sex = body.sex;
		patientData.preferredLanguage = body.preferredLanguage;
		patientData.address = body.address;

		const { value: patientValue, error: patientError } = patientSchema.validate(patientData, {
			allowUnknown: true, // Allow `__v` but remove it
			stripUnknown: true,
		});

		if (patientError) {
			handleError(response, patientError, 400, patientError.details[0].message);
			return;
		}


		// cast it explicitly to a document so that typescript doesn't complain

		const updatedPatientData = patientValue as PatientDocument;
		const updatedPatient = await PatientModel.findByIdAndUpdate(id, updatedPatientData, { new: true }).populate("preExistingConditions");

		response.status(200).json(updatedPatient);
	} catch (error) {
		handleError(response, error);
	}
};

export {
	getTotalPatients,
	getPatientsOlderThan,
	getAllPatients,
	findPatientsByDemographic,
	createPatient,
	updatePatient,
};
