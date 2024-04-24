const providerRouter = require("express").Router();
const Provider = require("../../models/provider");
const schema = require("./providerSchema");
const jwt = require("jsonwebtoken");

providerRouter.get("/", (request, response) => {
	Provider.find({}).then(provider => {
		response.json(provider);
	});
});

providerRouter.post("/", async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" });
	}

	const body = request.body;

	const { error, value } = schema.validate(body);
	const provider = new Provider({
		firstName: body.name.split(" ")[0],
		lastName: body.name.split(" ")[1],
		phone: body.phone,
		email: body.email,
		license: {
			state: body.license.split(' ')[0],
			license_id: body.license.split(' ')[1]
		}
	});

	if (error) {
		const { details } = error;
		return response.status(422).json({
			success: false,
			result: null,
			message: details[0]?.message,
		});
	}

	const savedProvider = await provider.save();
	response.status(201).json(savedProvider);

});

module.exports = providerRouter;