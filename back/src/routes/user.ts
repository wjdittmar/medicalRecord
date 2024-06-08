import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import * as userController from "../controllers/userController";

const userRouter = Router();

// Route for user registration (no login required)
userRouter.post("/", userController.registerUser);

// Route for getting all users (login required)
userRouter.get("/", verifyToken, userController.getAllUsers);

export { userRouter };
