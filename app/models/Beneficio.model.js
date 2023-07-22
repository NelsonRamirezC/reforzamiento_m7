import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const Beneficio = sequelize.define(
    "Beneficios",
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: "Beneficios",
    }
);

export default Beneficio;
