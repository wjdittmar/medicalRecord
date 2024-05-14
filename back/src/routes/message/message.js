const messageRouter = require("express").Router();
const Message = require("../../models/message");
const { verifyToken } = require("../../utils/middleware");
const schema = require("./messageSchema");
const mongoose = require("mongoose");
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
		const page = parseInt(request.query.page, 10) || 1;
		const ITEMS_PER_PAGE = 10;
		const messages = await Message.aggregate([
			{
				$match: { recipient: new mongoose.Types.ObjectId(recipient) }
			},
			{
				$lookup: {
					from: "users",
					localField: "sender",
					foreignField: "_id",
					as: "sender"
				}
			},
			{
				$unwind: "$sender"
			},
			{
				$lookup: {
					from: "users",
					localField: "recipient",
					foreignField: "_id",
					as: "recipient"
				}
			},
			{
				$unwind: "$recipient"
			},
			{
				$facet: {
					metadata: [
						{ $count: "totalCount" }
					],
					data: [
						{ $skip: (page - 1) * ITEMS_PER_PAGE },
						{ $limit: ITEMS_PER_PAGE }
					]
				}
			}
		]);

		response.json({
			messages: messages[0].data,
			metadata: {
				totalCount: messages[0].metadata[0].totalCount,
				pageSize: ITEMS_PER_PAGE
			}
		});
	} catch (error) {
		console.log(error.message)
		response.status(500).json({ error: error.message });
	}


});


module.exports = messageRouter;