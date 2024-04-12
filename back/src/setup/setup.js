const randomEntry = require("./utils");
const db = require("../utils/db");
const Patient = require("../models/patient");
const Provider = require("../models/provider");
const Diagnosis = require("../models/diagnosis");
const Visit = require("../models/visit");

const fs = require("fs");
const { parse } = require("csv-parse");

const NUM_PROVIDERS = 50;
const NUM_PATIENTS = 50;
const NUM_VISITS = 100;
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

async function readAddresses() {
	return new Promise((resolve, reject) => {
		const addresses = [];
		const stream = fs.createReadStream("src/data/sf_addresses_100.csv")
			.pipe(parse({ delimiter: ",", from_line: 2 }));

		stream.on("data", function (row) {
			addresses.push(row);
		});

		stream.on("end", function () {
			resolve(addresses);
		});

		stream.on("error", function (error) {
			reject(error);
		});
	});
}


async function saveVisits() {

	const addresses = await readAddresses();

	try {
		const result = await Patient.aggregate([
			{ $sample: { size: NUM_VISITS } },
			{ $project: { _id: 1 } }
		]);
		// Run database operations
		const promises = [];

		for (let i = 0; i < NUM_VISITS; i++) {
			const visit = new Visit({
				...randomEntry.createRandomVisit(),
				address: {
					address1: addresses[i][0],
					city: addresses[i][1],
					state: addresses[i][2],
					zipCode: addresses[i][3]
				},
				patient: result[i]._id
			});

			const promise = visit.save()
				.then(() => {
					//console.log("Adding visit", visit);
				})
				.catch((error) => {
					console.log("Error adding visit to database:", error.message);
				});

			promises.push(promise);
		}

		await Promise.allSettled(promises);
		console.log("All visits saved");
	} catch (error) {
		console.error("Error saving visits:", error.message);
	}
}

async function generateCollections() {
	try {
		// Connect to the database first
		await db.connectDB();
		console.log("Connected to the database");

		// Run both functions concurrently
		await Promise.allSettled([savePatients(), saveProviders()]);

		// Generate visits
		await saveVisits();

		// Disconnect from the database after both functions are done
		await db.disconnectDB();
		console.log("Disconnected from the database");
	} catch (error) {
		console.error("Error:", error.message);
		await db.disconnectDB();
	}
}

generateCollections();