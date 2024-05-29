const userRouter = require("express").Router();
const { verifyToken } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Route for user registration (no login required)
userRouter.post("/", userController.registerUser);

// Route for getting all users (login required)
userRouter.get("/", verifyToken, userController.getAllUsers);

module.exports = { userRouter };
