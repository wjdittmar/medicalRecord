const bcrypt = require("bcrypt");
const fs = require("fs");
const { parse } = require("csv-parse");

const randomEntry = require("./utils");
const db = require("../utils/db");
const Patient = require("../models/patient");
const Provider = require("../models/provider");
const Diagnosis = require("../models/diagnosis");
const Visit = require("../models/visit");
const User = require("../models/user");
const { createUser } = require("../routes/users");

const NUM_PROVIDERS = 50;
const NUM_PATIENTS = 100;
const NUM_VISITS = 100;
const DIAGNOSES_PER_PATIENT = 5;

async function savePatients() {
	try {
		const result = await Diagnosis.aggregate([
			{ $sample: { size: NUM_PATIENTS * DIAGNOSES_PER_PATIENT } },
			{ $project: { _id: 1 } }
		]);
		const promises = [];

		// TODO: this only reads 100 addresses, so will break if we try to change number of patients

		const addresses = await readAddresses();

		for (let i = 0; i < NUM_PATIENTS; i++) {
			const user = randomEntry.createRandomUser();
			const patientData = randomEntry.createRandomPatient();

			const savedUser = await createUser({ ...user, password: "pass", role: "patient" });

			const diagnoses = result.slice(i * DIAGNOSES_PER_PATIENT, (i + 1) * DIAGNOSES_PER_PATIENT);
			const patient = new Patient({
				user: savedUser._id,
				...patientData,
				address: {
					line: addresses[i][0],
					city: addresses[i][1],
					state: addresses[i][2],
					postalCode: addresses[i][3],
					country: "US"
				},
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
		return Promise.resolve();
	} catch (error) {
		console.error("Error fetching diagnoses:", error.message);
	}
}

async function saveProviders() {
	try {

		// TODO: could do this as a bulk operation
		// and may not need to block on provider.save to increase performance
		// but this is only done once for a small number of insertions so won't have a large impact
		for (let i = 0; i < NUM_PROVIDERS; i++) {

			const user = randomEntry.createRandomUser();
			const randomProvider = randomEntry.createRandomProvider();
			const savedUser = await createUser({ ...user, password: "pass", role: "provider" });

			const provider = new Provider({
				user: savedUser._id,
				license: randomProvider.license
			});
			const savedProvider = await provider.save();
		}
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

async function createAdmin() {
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash("password", saltRounds);

	const user = new User(
		{
			name: "James Dittmar",
			email: "admin@admin.com",
			passwordHash: passwordHash,
			role: "admin"
		}
	);

	user.save()
		.then(() => {
			//console.log("Adding user", user);
		})
		.catch((error) => {
			console.log("Error adding user to database:", error.message);
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
					line: addresses[i][0],
					city: addresses[i][1],
					state: addresses[i][2],
					postalCode: addresses[i][3],
					country: "US"
				},
				patient: result[i]._id
			});
			const promise = visit.save()
				.then(() => {
					//console.log("Adding visit", visit);
				})
				.catch((error) => {
					//console.log(visit);
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

		// do not need to await for user creation, it has no other dependencies

		createAdmin();

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