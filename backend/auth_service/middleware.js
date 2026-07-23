const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecretkey123meowmeownigga";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            status: 401,
            message: "Access token missing or invalid format (Bearer token required)"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            status: 403,
            message: "Invalid or expired token"
        });
    }
};

module.exports = { verifyToken, JWT_SECRET };
