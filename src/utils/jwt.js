import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const jwtUtils = {
  generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  },

  verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  },
};

export default jwtUtils;
