// src/middlewares/auth.js
import { verifyToken } from "../utils/jwt.js";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Header esperado: "Authorization: Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // guarda dados do token (email, role, etc.)
    next(); // deixa passar para o controller
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}
