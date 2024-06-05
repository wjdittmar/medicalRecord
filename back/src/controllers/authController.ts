import jwt from "jsonwebtoken";
import { UserTokenPayload } from "../../../types/userTokenPayload";

const generateAccessToken = (user: UserTokenPayload) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1d" });
};

export {
	generateAccessToken,
};
