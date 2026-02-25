import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";
import { generateEmailToken, verifyEmailToken } from "../utils/jwt.js";

const RegisterController = {    
    async register(req, res) {
        try {
            const { email, senha } = req.body;

            if(!email || !senha) {
                return res.status(400).json({ error: "Email e senha são obrigatórios." });
            }

            //verifica se ja existe um user com o email
            const existente = await Usuario.findByPk(email);
            if(existente) {     
                return res.status(409).json({ error: "Email já registrado." });
            }

            //hash da senha
            const hashedPassword = await bcrypt.hash(senha, 10);

            //criar utilizador
            const novoUsuario = await Usuario.create({
                email,
                senha: hashedPassword,
                tipo_usuario: "cliente", //padrão para novos registros
                email_validado: false, //email ainda não validado
                ativo: false, //conta inativa até validar email
            });

            //gerar token de validação de email
            const emailToken = generateEmailToken({ email: novoUsuario.email });
                    // Link de validação
             const link = `http://localhost:3000/api/public/validar-email?token=${emailToken}`;

            
             // Simulação de envio de email (por agora)
             console.log("====================================");
             console.log("LINK DE VALIDACAO EMAIL:");
             console.log(link);
             console.log("====================================");

                    return res.status(201).json({ message: "Usuário registrado com sucesso. Verifique seu email para validar a conta." });
                                } catch (error) {   
                                    console.error("Erro no registro:", error);
                                    return res.status(500).json({ error: "Erro no servidor." });        
                                        }
                            },
            async validarEmail(req, res){
                try{
                        const { token}= req.query;
                        if(!token) {
                            return res.status(400).json({ error: "Token de validação ausente." });
                        }

                        let decoded;
                         try {
                            decoded = verifyEmailToken(token);
                        } catch(error) {
                            return res.status(400).json({ error:"Token inválido ou expirado."});
                }
                            
                            const usuario = await Usuario.findByPk(decoded.email);
                            if(!usuario) {
                                return res.status(404).json({ error: "Usuario nao encontrado."})
                            }
                           
                            // Atualiza o campo email_validado para true
                            await usuario.update({ email_validado: true, ativo: true });
                            return res.status(200).json({ message: "Email validado com sucesso. Agora você pode fazer login." });


                }catch(error) {
                    console.error("Erro na validação de email:", error);
                    return res.status(500).json({ error: "Erro no servidor." });
            }
        }
    };
                
export default RegisterController;
