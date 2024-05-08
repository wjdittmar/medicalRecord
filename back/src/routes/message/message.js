const messageRouter = require("express").Router();
const Message = require("../../models/message");
const { verifyToken } = require("../../utils/middleware");
const schema = require("./messageSchema");

messageRouter.get("/", verifyToken, (request, response) => {
	Message.find({}).then(message => {
		response.json(message);
	});
});

messageRouter.post("/", verifyToken, async (request, response) => {
	try {
		const body = request.body;
		const { error, value } = schema.validate(body);
		if (error) {
			return response.status(422).json({
				success: false,
				result: null,
				message: error.details[0]?.message,
			});
		}
		const messageToSave = new Message(value);
		const savedMessage = await messageToSave.save();
		response.status(201).json(savedMessage);
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});

messageRouter.get("/toRecipient", verifyToken, async (request, response) => {
	try {
		const recipient = request.query.recipient;
		const messages = await Message.find({ recipient: { $eq: recipient } }).populate("sender", { name: 1 }).populate("recipient", { name: 1 });
		response.json({ messages });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
});


module.exports = messageRouter;