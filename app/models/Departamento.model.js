import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const Departamento = sequelize.define(
    "Departamentos",
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: "Departamentos",
    }
);

export default Departamento;
