const request = require("supertest");
const app = require("../app");
const db = require("../utils/db");
const User = require("../models/user/user");
const Provider = require("../models/provider/provider");
const { jwtDecode } = require("jwt-decode");

beforeAll(async () => {
	await db.connectDB();
	await User.deleteMany({});
	await Provider.deleteMany({});
});

afterAll(async () => {
	await db.disconnectDB();
});

describe("User Registration and Login", () => {
	const userData = {
		email: "testuser@testuser.com",
		name: "test name",
		password: "password",
	};

	it("should register a new user", async () => {
		const res = await request(app)
			.post("/api/users")
			.send(userData)
			.expect(201);
		expect(res.body.license).toBeDefined();
		expect(res.body._id).toBeDefined();
		expect(res.body.user).toBeDefined();
	});


	it("should login an existing user", async () => {
		const res = await request(app)
			.post("/api/login")
			.send({ email: userData.email, password: userData.password })
			.expect(200);

		expect(res.body.accessToken).toBeDefined();
		const decoded = jwtDecode(res.body.accessToken);
		console.log(decoded);
	});
});
