import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";
import { generateEmailToken, verifyEmailToken } from "../utils/jwt.js";
import config from "../config.js"; // <-- ajusta o caminho se necessário

const RegisterController = {
  async register(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
      }

      // Modo DEV (bypass)
      if (config.DEV_BYPASS_AUTH === "true") {
        const emailToken = generateEmailToken({ email });
        const link = `http://localhost:3000/api/public/validar-email?token=${emailToken}`;

        console.log("====================================");
        console.log("LINK DE VALIDACAO EMAIL (DEV):");
        console.log(link);
        console.log("====================================");

        return res.status(201).json({
          message: "Conta criada em modo DEV (sem BD). Verifique o link no console.",
          link,
        });
      }

      // verifica se já existe um user com o email
      const existente = await Usuario.findByPk(email);
      if (existente) {
        return res.status(409).json({ error: "Email já registrado." });
      }

      // hash da senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // criar utilizador
      await Usuario.create({
        email,
        senha: hashedPassword,
        tipo_usuario: "cliente",
        email_validado: false,
        ativo: false,
      });

      return res.status(201).json({
        message: "Usuário registrado com sucesso. Verifique seu email para validar a conta.",
      });
    } catch (error) {
      console.error("Erro no registro:", error);
      return res.status(500).json({ error: "Erro no servidor." });
    }
  },

  async validarEmail(req, res) {
    try {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ error: "Token de validação ausente." });
      }

      let decoded;
      try {
        decoded = verifyEmailToken(token);
      } catch (error) {
        return res.status(400).json({ error: "Token inválido ou expirado." });
      }

      // Modo DEV (bypass)
      if (config.DEV_BYPASS_AUTH === "true") {
        return res.status(200).json({
          message: "Email validado em modo DEV (sem BD).",
          email: decoded.email,
        });
      }

      // Modo normal: atualizar utilizador na BD
      const user = await Usuario.findByPk(decoded.email);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // se já estiver validado, não rebenta (idempotente)
      if (user.email_validado === true) {
        return res.status(200).json({ message: "Email já estava validado." });
      }

      await user.update({
        email_validado: true,
        ativo: true,
      });

      return res.status(200).json({ message: "Email validado com sucesso. Conta ativada." });
    } catch (error) {
      console.error("Erro na validação de email:", error);
      return res.status(500).json({ error: "Erro no servidor." });
    }
  },
};

export default RegisterController;