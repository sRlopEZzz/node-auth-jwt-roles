import app from "./src/app.js";
import dotenv from "dotenv";
import sequelize from "./src/database/conection.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {

    // TENTA ligar à BD (mas não trava servidor se falhar)
    await sequelize.authenticate();
    console.log("Ligação à base de dados estabelecida com sucesso.");

  } catch (error) {
    console.log("Base de dados ainda não configurada. Servidor continua em modo dev.");
  }

  app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
  });
}

startServer();
