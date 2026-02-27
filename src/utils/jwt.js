import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const AUTH_EXPIRES = process.env.JWT_AUTH_EXPIRES || "1d"; // 1 dia para expirar do token de autenticação

const EMAIL_SECRET = process.env.JWT_EMAIL_SECRET || "dev_email_secret";
const EMAIL_EXPIRES = process.env.JWT_EMAIL_EXPIRES || "15m"; //15m para ativar a conta (validar email)

export function generateAuthToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: AUTH_EXPIRES });
}

export function verifyAuthToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

//geral tokenn
export function generateEmailToken(payload) {
  return jwt.sign(payload, EMAIL_SECRET, { expiresIn: EMAIL_EXPIRES });
}

//validar token de email
export function verifyEmailToken(token) {
  return jwt.verify(token, EMAIL_SECRET);
}