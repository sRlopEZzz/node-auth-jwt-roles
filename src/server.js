import app from "./src/app.js";
import dotenv from "dotenv";
import sequelize from "./src/database/connection.js";
dotenv.config();

const PORT = process.env.PORT || 3000;


async function startserver(){

  try{
    await sequelize.authenticate();
    console.log("ligacao a base de dados estabelecida com sucesso.")

    app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});

  }catch (error){
    console.log("erro ao ligar a base de dados", error)
  }

}


startserver();