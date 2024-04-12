const randomEntry = require("./utils");
const db = require("../utils/db");
const Patient = require("../models/patient");
const Provider = require("../models/provider");
const Diagnosis = require("../models/diagnosis");

const NUM_PROVIDERS = 50;
const NUM_PATIENTS = 50;
const DIAGNOSES_PER_PATIENT = 5;

async function savePatients() {
	try {
		const result = await Diagnosis.aggregate([
			{ $sample: { size: NUM_PATIENTS * DIAGNOSES_PER_PATIENT } },
			{ $project: { _id: 1 } }
		]);
		const promises = [];
		for (let i = 0; i < NUM_PATIENTS; i++) {
			const patientData = randomEntry.createRandomPatient();
			const diagnoses = result.slice(i * DIAGNOSES_PER_PATIENT, (i + 1) * DIAGNOSES_PER_PATIENT);
			const patient = new Patient({
				...patientData,
				preExistingConditions: diagnoses.map(d => d._id)
			});
			const promise = patient.save()
				.then(() => {
					//console.log("Adding patient", patient);
				})
				.catch((error) => {
					console.log("Error adding patient to database:", error.message);
				});
			promises.push(promise);
		}
		await Promise.allSettled(promises);
		console.log("All patients saved");
	} catch (error) {
		console.error("Error fetching diagnoses:", error.message);
	}
}

async function saveProviders() {
	try {
		// Run database operations
		const promises = [];

		for (let i = 0; i < NUM_PROVIDERS; i++) {
			const provider = new Provider(randomEntry.createRandomProvider());
			const promise = provider.save()
				.then(() => {
					// console.log("Adding provider", provider);
				})
				.catch((error) => {
					console.log("Error adding provider to database:", error.message);
				});

			promises.push(promise);
		}

		await Promise.allSettled(promises);
		console.log("All providers saved");
	} catch (error) {
		console.error("Error saving providers:", error.message);
	}
}

// Connect to the database first
db.connectDB()
	.then(() => {
		console.log("Connected to the database");

		// Run both functions concurrently
		Promise.allSettled([savePatients(), saveProviders()])
			.then(() => {
				// Disconnect from the database after both functions are done
				db.disconnectDB();
				console.log("Disconnected from the database");
			})
			.catch((error) => {
				console.error("Error:", error.message);
				db.disconnectDB();
			});
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error.message);
	});
