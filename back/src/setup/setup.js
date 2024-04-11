const randomEntry = require("./utils");
const db = require("../utils/db");
const Provider = require("../models/provider");

// Connect to the database
db.connectDB()
	.then(() => {
		console.log("Connected to the database");

		// Run database operations
		const promises = []; // Array to store promises

		for (let i = 0; i < 50; i++) {
			const provider = new Provider(randomEntry.createRandomProvider());
			const promise = provider.save()
				.then(() => {
					console.log("Adding provider", provider);
				})
				.catch((error) => {
					console.log("Error adding provider to database:", error.message);
				});

			promises.push(promise); // Store the promise
		}

		// Wait for all promises to resolve
		return Promise.all(promises);
	})
	.then(() => {
		console.log("All providers saved");

		// Disconnect from the database after operations are done
		db.disconnectDB();
	})
	.catch((error) => {
		console.log("Error connecting to the database:", error.message);

		// Disconnect from the database if an error occurs
		db.disconnectDB();
	});
