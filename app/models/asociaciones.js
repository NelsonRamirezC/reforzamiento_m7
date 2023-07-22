import Usuario from "./Usuario.model.js";
import Direccion from "./Direccion.model.js";
import Departamento from "./Departamento.model.js";
import Beneficio from "./Beneficio.model.js";

//RELACIÓN 1 A 1
Usuario.hasOne(Direccion, {
    foreignKey: "usuarioId",
    as: "direccion",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Direccion.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    as: "propietario",
});

//RELACIÓN 1 A MUCHOS
Departamento.hasMany(Usuario, {
    foreignKey: "departamentoId",
    as: "equipo",
});

Usuario.belongsTo(Departamento, {
    foreignKey: "departamentoId",
    as: "departamento",
});


//RELACIÓN MUCHOS A MUCHOS

Beneficio.belongsToMany(Usuario, {
    through: "Beneficios_Usuarios",
    as: "beneficiarios",
});

Usuario.belongsToMany(Beneficio, {
    through: "Beneficios_Usuarios",
    as: "beneficios"
});