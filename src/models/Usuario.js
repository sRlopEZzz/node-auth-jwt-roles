modelimport { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tipo_usuario: {
      type: DataTypes.ENUM("admin", "cliente", "funcionario"),
      defaultValue: "cliente",
    },

    email_validado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
  }
);

export default Usuario;
