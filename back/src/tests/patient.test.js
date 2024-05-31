const request = require("supertest");
const app = require("../app"); // Make sure the path to your app is correct
const db = require("../utils/db");
const Patient = require("../models/patient/patient");
const User = require("../models/user/user");
const { createUser } = require("../controllers/utils/userUtils");
const { generateAccessToken } = require("../controllers/authController");

describe("Patient Endpoints", () => {
	let token;
	let patientId;

	beforeAll(async () => {
		// Connect to the test database
		await db.connectDB();
		await Patient.deleteMany();
		await User.deleteMany();

		// Create a test user and get a token
		const user = await createUser({
			email: "test@example.com",
			name: "Test User",
			phone: "1234567890",
			password: "password",
			role: "admin"
		});
		const userWithId = { ...user.toJSON(), id: user._id };

		token = generateAccessToken(userWithId);
	});

	afterAll(async () => {
		// Clean up the database and close the connection
		await db.disconnectDB();
	});

	it("should create a new patient", async () => {
		const response = await request(app)
			.post("/api/patients")
			.set("authorization", `Bearer ${token}`)
			.send({
				name: "Jane Doe",
				email: "janedoe@example.com",
				phone: "9876543210",
				password: "password",
				preferredLanguage: "English",
				dob: "1990-01-01",
				sex: "female",
				ssn: "123-45-6789",
				address: {
					line: "123 Main St",
					city: "Somewhere",
					state: "CA",
					postalCode: "90210"
				}
			});
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("_id");
		patientId = response.body._id;
	});

	it("should get all patients", async () => {
		const response = await request(app)
			.get("/api/patients")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body.length).toBeGreaterThan(0);
	});

	it("should get the total number of patients", async () => {
		const response = await request(app)
			.get("/api/patients/total")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("totalPatients");
		expect(response.body.totalPatients).toBe(1);
	});

	it("should find patients by demographic data", async () => {
		const response = await request(app)
			.get("/api/patients/search")
			.set("Authorization", `Bearer ${token}`)
			.query({ name: "Jane Doe" });

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0].user.name).toBe("Jane Doe");
	});

	it("should update a patient", async () => {
		const response = await request(app)
			.put(`/api/patients/${patientId}`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				dob: "1991-02-02",
				sex: "female",
				ssn: "987-65-4321",
				preferredLanguage: "Spanish",
				address: {
					line: "456 Elm St",
					city: "Anywhere",
					state: "TX",
					postalCode: "75001"
				},
				user: {
					name: "Jane Smith",
					email: "janesmith@example.com",
					phone: "5555555555"
				}
			});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("_id");
		expect(response.body.dob).toBe("1991-02-02T00:00:00.000Z");
		expect(response.body.address.line).toBe("456 Elm St");
	});
});
