import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const Usuario = sequelize.define(
    "Usuarios",
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Email no cumple con el formato requerido (ejemplo@gmail.com)"
                }
            },
        },
    },
    {
        timestamps: false,
        tableName: "Usuarios",
    }
);

export default Usuario;
