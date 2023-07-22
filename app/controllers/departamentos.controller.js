import Usuario from "../models/Usuario.model.js";
import Departamento from "../models/Departamento.model.js";

export const findAll = async (req, res) => {
    try {
        let departamentos = await Departamento.findAll({
            include: [
                {
                    model: Usuario,
                    as: "equipo",
                },
            ],
        });
        if (departamentos.length == 0) {
            return res
                .status(404)
                .json({
                    code: 404,
                    message: "No se encontraron departamentos.",
                });
        }

        departamentos = departamentos.map((departamento) =>
            departamento.toJSON()
        );

        console.log("departamentos encontrados", departamentos);
        res.json({ code: 200, message: "OK.", departamentos });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al obtener los departamentos del sistema.",
        });
    }
};

export const create = async (req, res) => {
    try {
        let { nombre } = req.body;

        let departamento = await Departamento.create({
            nombre,
        });

        console.log("departamento creado: ", departamento);

        res.status(201).json({
            code: 201,
            message: "departamento creado con éxito",
            departamento,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "error al crear el departamento.",
        });
    }
};

export const agregarIntegrante = async (req, res) => {
    try {
        let { departamentoId, usuarioId } = req.body;

        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento)
            return res
                .status(404)
                .json({ code: 404, message: "departamento no existe." });

        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario)
            return res
                .status(404)
                .json({ code: 404, message: "usuario no existe." });

        await departamento.addEquipo(usuario);

        return res
            .status(200)
            .json({
                code: 200,
                message:
                    "Se ha integrado correctamente el usuario al departamento.",
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al vincular el usuario con el depto.",
        });
    }
};
