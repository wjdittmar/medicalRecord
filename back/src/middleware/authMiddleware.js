import { verify } from "jsonwebtoken";
import { logError } from "../services/loggerService";

export const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.startsWith("Bearer ")) {
		request.token = authorization.replace("Bearer ", "");
	}
	next();
};

export const verifyToken = (request, response, next) => {
	const token = request.token;
	if (!token) {
		return response.status(401).json({ error: "Token missing" });
	}

	try {
		const decodedToken = verify(token, process.env.ACCESS_TOKEN_SECRET);
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

export const verifyRole = (roles) => {
	return (req, res, next) => {
		const token = req.token;
		if (!token) {
			return res.status(401).json({ error: "Token missing" });
		}

		try {
			const decodedToken = verify(token, process.env.ACCESS_TOKEN_SECRET);
			if (!roles.includes(decodedToken.role)) {
				return res.status(403).json({ error: "Access denied" });
			}
			req.decodedToken = decodedToken;
			next();
		} catch (error) {
			logError("Error verifying token for role: ", error);
			return res.status(401).json({ error: "Token invalid" });
		}
	};
};

export const verifyTokenAndRole = (roles) => {
	return (req, res, next) => {
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
