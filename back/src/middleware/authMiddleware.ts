import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { logError } from "../services/loggerService";

interface DecodedToken {
	id: string;
	role: string;
	iat: number;
	exp: number;
}

export const tokenExtractor = (request: Request, response: Response, next: NextFunction): void => {
	const authorization = request.get("authorization");
	if (authorization && authorization.startsWith("Bearer ")) {
		request.token = authorization.replace("Bearer ", "");
	}
	next();
};

export const verifyToken = (request: Request, response: Response, next: NextFunction): void | Response => {
	const token = request.token;
	if (!token) {
		return response.status(401).json({ error: "Token missing" });
	}

	try {
		const decodedToken = verify(token, process.env.ACCESS_TOKEN_SECRET as string) as DecodedToken;
		if (!decodedToken.id) {
			return response.status(401).json({ error: "Token invalid" });
		}
		request.decodedToken = decodedToken; // pass on the token so the other services can access it
		next();
	} catch (error) {
		logError("Error verifying token: ", error);
		return response.status(401).json({ error: "Token invalid" });
	}
};

export const verifyRole = (roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction): void | Response => {
		const decodedToken = req.decodedToken;
		if (!decodedToken) {
			return res.status(401).json({ error: "Token missing or invalid" });
		}

		if (!roles.includes(decodedToken.role)) {
			return res.status(403).json({ error: "Access denied" });
		}

		next();
	};
};

export const verifyTokenAndRole = (roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		verifyToken(req, res, (err) => {
			if (err) return next(err);
			verifyRole(roles)(req, res, next);
		});
	};
};

export default {
	tokenExtractor,
	verifyToken,
	verifyRole,
	verifyTokenAndRole,
};

// add the token and decodedToken fields to the request object

declare module "express-serve-static-core" {
	interface Request {
		token?: string;
		decodedToken?: DecodedToken;
	}
}
