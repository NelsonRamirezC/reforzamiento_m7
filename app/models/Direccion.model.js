import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const Direccion = sequelize.define(
    "Direcciones",
    {
        calle: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        comuna: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        ciudad: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: "Direcciones",
    }
);

export default Direccion;
