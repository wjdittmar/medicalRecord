const messageRouter = require("express").Router();
const { verifyToken, verifyTokenAndRole } = require("../middleware/authMiddleware");
const messageController = require("../controllers/messageController");

// Route to get all messages (admin only)
messageRouter.get("/", verifyTokenAndRole(["admin"]), messageController.getAllMessages);

// Route to create a new message
messageRouter.post("/", verifyToken, messageController.createMessage);

// Route to get messages for a specific recipient with pagination
messageRouter.get("/toRecipient", verifyToken, messageController.getMessagesByRecipient);

module.exports = messageRouter;
