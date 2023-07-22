import Usuario from "../models/Usuario.model.js";
import Beneficio from "../models/Beneficio.model.js";

export const findAll = async (req, res) => {
    try {
        let beneficios = await Beneficio.findAll({
            include: [
                {
                    model: Usuario,
                    as: "beneficiarios",
                },
            ],
        });
        if (beneficios.length == 0) {
            return res.status(404).json({
                code: 404,
                message: "No se encontraron beneficios.",
            });
        }

        beneficios = beneficios.map((beneficio) =>
            beneficio.toJSON()
        );

        console.log("beneficios encontrados", beneficios);
        res.json({ code: 200, message: "OK.", beneficios });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al obtener los beneficios del sistema.",
        });
    }
};

export const create = async (req, res) => {
    try {
        let { nombre, descuento } = req.body;

        let beneficio = await Beneficio.create({
            nombre,
            descuento
        });

        console.log("beneficio creado: ", beneficio);

        res.status(201).json({
            code: 201,
            message: "beneficio creado con éxito",
            beneficio,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "error al crear el beneficio.",
        });
    }
};

export const agregarBeneficiario = async (req, res) => {
    try {
        let { beneficioId, usuarioId } = req.body;

        let beneficio = await Beneficio.findByPk(beneficioId);

        if (!beneficio)
            return res
                .status(404)
                .json({ code: 404, message: "beneficio no existe." });

        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario)
            return res
                .status(404)
                .json({ code: 404, message: "usuario no existe." });

        await beneficio.addBeneficiarios(usuario);

        return res.status(200).json({
            code: 200,
            message:
                "Se ha integrado correctamente el usuario al beneficio.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al vincular el usuario con el depto.",
        });
    }
};