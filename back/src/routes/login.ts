import express, { Request, Response } from "express";
import { login } from "../controllers/loginController";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
	login(req, res);
});

export default router;
