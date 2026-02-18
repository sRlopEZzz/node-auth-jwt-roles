// src/controllers/UserController.js
import jwtUtils from "../utils/jwt.js"
import Usuario from "../models/Usuario.js";

const UserController = {
  async validarEmail(req, res) {
    try {
      const { token } = req.query;
      if (!token) {
        return res.status(400).json({ error: "Token não fornecido." });
      }

      const decoded = jwtUtils.verifyToken(token);
      const usuario = await Usuario.findByPk(decoded.email);

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      if (usuario.email_validado) {
        return res.status(200).json({ message: "E-mail já validado." });
      }

      usuario.email_validado = true;
      await usuario.save();

      return res.status(200).json({ message: "E-mail validado com sucesso." });
    } catch {
      return res.status(400).json({ error: "Token inválido ou expirado." });
    }
  },
};

export default UserController;
