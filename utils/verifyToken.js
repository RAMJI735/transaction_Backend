import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();


export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // 2. Token verify करो
    const decoded = jwt.verify(token, process.env.secret);

    // 3. User data req में attach करो
    req.user = decoded;
    // 4. आगे जाने दो
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}