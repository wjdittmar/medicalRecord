const messageRouter = require("express").Router();
const Message = require("../../models/message");
const { verifyToken, verifyTokenAndRole } = require("../../utils/middleware");
const schema = require("./messageSchema");
const mongoose = require("mongoose");
const loggerService = require("../../services/loggerService");
const handleError = require("../../utils/errorHandler");

// only admins should be able to see all messages

messageRouter.get("/", verifyTokenAndRole(["admin"]), (request, response) => {
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
		handleError(response, error);
	}
});
messageRouter.get("/toRecipient", verifyToken, async (request, response) => {

	const ITEMS_PER_PAGE = 10;
	try {
		const recipient = request.query.recipient;
		const page = parseInt(request.query.page, 10) || 1;
		const messages = await Message.aggregate([
			{ $match: { recipient: new mongoose.Types.ObjectId(recipient) } },
			{ $lookup: { from: "users", localField: "sender", foreignField: "_id", as: "sender" } },
			{ $unwind: "$sender" },
			{ $lookup: { from: "users", localField: "recipient", foreignField: "_id", as: "recipient" } },
			{ $unwind: "$recipient" },
			{
				$facet: {
					metadata: [{ $count: "totalCount" }],
					data: [{ $skip: (page - 1) * ITEMS_PER_PAGE }, { $limit: ITEMS_PER_PAGE }]
				}
			}
		]);

		// Check if the messages array is empty
		if (messages[0].data.length === 0) {
			response.json({
				messages: [],
				metadata: {
					totalCount: 0,
					pageSize: ITEMS_PER_PAGE
				}
			});
		} else {
			response.json({
				messages: messages[0].data,
				metadata: {
					totalCount: messages[0].metadata[0].totalCount,
					pageSize: ITEMS_PER_PAGE
				}
			});
		}
	} catch (error) {
		handleError(response, error);
	}
});



module.exports = messageRouter;