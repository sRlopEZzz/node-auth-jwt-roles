
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";
import { generateAuthToken } from "../utils/jwt.js";
import config from "../config/config.js";

const AuthController = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
      }

      // Bypass de autenticação para desenvolvimento(teste rápido sem banco de dados)
        if (config.DEV_BYPASS_AUTH === "true") {
        // regra simples para simular roles
        const tipo_usuario = email.toLowerCase().includes("admin") ? "admin" : "cliente";

    const token = generateAuthToken({ email, tipo_usuario });

        return res.status(200).json({
          message: "Login DEV (bypass) efetuado.",
          token,
          email,
          tipo_usuario,
        });
      }


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
      return res.status(500).json({ error: "Erro no servidor." });
    }
  },
};

export default AuthController;
