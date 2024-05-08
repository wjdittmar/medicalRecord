const jwt = require("jsonwebtoken");

const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.startsWith("Bearer ")) {
		request.token = authorization.replace("Bearer ", "");
	}
	next();
};

// Middleware to verify token
const verifyToken = (request, response, next) => {
	const token = request.token;
	try {
		const decodedToken = jwt.verify(token, process.env.SECRET);
		if (!decodedToken.id) {
			return response.status(401).json({ error: "Token invalid" });
		}
		request.decodedToken = decodedToken; // pass on the token so the other services can access it
		next();
	} catch (error) {
		return response.status(401).json({ error: "Token invalid" });
	}
};


module.exports = {
	tokenExtractor,
	verifyToken
};