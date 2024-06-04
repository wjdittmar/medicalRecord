import jwt from "jsonwebtoken";
import { User } from '../../../types/user'; // Adjust the relative path as needed

const generateAccessToken = (user: User) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1d" });
};

export {
	generateAccessToken,
};
