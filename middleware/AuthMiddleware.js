import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ message: "No access token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded.user; // Attach user info to request object
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(403).json({ message: "Forbidden" });
    }
}

export default authMiddleware;