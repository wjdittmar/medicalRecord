import { Router } from "express";
import { verifyToken, verifyTokenAndRole } from "../middleware/authMiddleware";
import * as messageController from "../controllers/messageController";

const messageRouter = Router();
// Route to get all messages (admin only)
messageRouter.get("/", verifyTokenAndRole(["admin"]), messageController.getAllMessages);

// Route to create a new message
messageRouter.post("/", verifyToken, messageController.createMessage);

// Route to get messages for a specific recipient with pagination
messageRouter.get("/toRecipient", verifyToken, messageController.getMessagesByRecipient);

export default messageRouter;
