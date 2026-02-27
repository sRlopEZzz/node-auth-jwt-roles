import bcrypt from "bcryptjs";
import { generateAuthToken } from "../utils/jwt.js";
import config from "../config/config.js";

const AuthController = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
      }

      if (config.DEV_BYPASS_AUTH === "true") {
        const tipo_usuario = email.toLowerCase().includes("admin") ? "admin" : "cliente";
        const token = generateAuthToken({ email, tipo_usuario });

        return res.status(200).json({
          message: "Login DEV (bypass) efetuado.",
          token,
          email,
          tipo_usuario,
        });
      }

      const { default: Usuario } = await import("../models/Usuario.js");

      const usuario = await Usuario.findByPk(email);
      if (!usuario) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      if (!usuario.email_validado) {
        return res.status(403).json({ error: "E-mail ainda não validado." });
      }

      const token = generateAuthToken({
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario,
      });

      return res.status(200).json({
        token,
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ error: "Erro no servidor." });
    }
  },
};

export default AuthController;