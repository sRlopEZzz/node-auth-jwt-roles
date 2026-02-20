import jwt from "jsonwebtoken";

//busca a variavel de ambiente ou usa valor padrão para desenvolvimento
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const jwtUtils = {
  generateToken(payload) {//gera um token com o payload e a chave secreta, com expiração de 1 dia
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  },

  verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  },
};

export default jwtUtils;
