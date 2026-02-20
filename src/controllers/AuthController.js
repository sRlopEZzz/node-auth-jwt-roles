
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";
import { generateToken } from "../utils/jwt.js";

const AuthController = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
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

      const token = generateToken({
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
