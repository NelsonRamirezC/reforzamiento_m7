import Usuario from "../models/Usuario.model.js";
import Direccion from "../models/Direccion.model.js";
import Departamento from "../models/Departamento.model.js";
import Beneficio from "../models/Beneficio.model.js";

export const findAll = async (req, res) => {
    try {
        let usuarios = await Usuario.findAll({
            include: [
                {
                    model: Direccion,
                    as: "direccion",
                },
                {
                    model: Departamento,
                    as: "departamento",
                },
                {
                    model: Beneficio,
                    as: "beneficios",
                },
            ],
        });
        if (usuarios.length == 0) {
            return res
                .status(404)
                .json({ code: 404, message: "No se encontraron usuarios." });
        }

        usuarios = usuarios.map((usuario) => usuario.toJSON());

        console.log("Usuarios encontrados", usuarios);
        res.json({ code: 200, message: "OK.", usuarios });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al obtener los usuarios del sistema.",
        });
    }
};

export const create = async (req, res) => {
    try {
        let { nombre, apellido, email, calle, comuna, ciudad } = req.body;

        /*  let usuario = await Usuario.create({
            nombre,
            apellido,
            email,
        });

        await Direccion.create({
            calle,
            comuna,
            ciudad,
            usuarioId: usuario.id
        });
 */

        let usuario = await Usuario.create(
            {
                nombre,
                apellido,
                email,
                direccion: [
                    {
                        calle,
                        comuna,
                        ciudad,
                    },
                ],
            },
            {
                include: [
                    {
                        model: Direccion,
                        as: "direccion",
                    },
                ],
            }
        );

        console.log("usuario creado: ", usuario);

        res.status(201).json({
            code: 201,
            message: "Usuario creado con éxito",
            usuario,
        });
    } catch (error) {
        /* let code = 500;
        let message = "Error al crear al usuario en el sistema.";
        if (error.errors[0]) {
            code = 400;
            message = error.errors[0].message;
        } */
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "error al crear el usuario.",
        });
    }
};

export const findById = async (req, res) => {
    let id = req.params.id;
    try {
        let usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res
                .status(404)
                .json({
                    code: 404,
                    message: "No se encontró al usuario con id: " + id,
                });
        }
        usuario = usuario.toJSON();
        console.log("Usuario encontrado", usuario);
        res.json({ code: 200, message: "Usuario encontrado", usuario });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Error al obtener el usuario con id ${id} solicitado.`,
        });
    }
};

export const deleteById = async (req, res) => {
    let id = req.params.id;
    try {
        let usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                code: 404,
                message: "El usuario que intenta elimar no existe",
            });
        }

        await usuario.destroy();

        //DESTROY CON CONDICIONES

        /*  await Usuario.destroy({
            where: {
                id: 1
            }
        }) */

        console.log(`Usuario con id ${id} eliminado.`);
        res.json({ code: 200, message: `Usuario con id ${id} eliminado.` });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: `Error al eliminar al usuario con id ${id}.`,
        });
    }
};

export const updateById = async (req, res) => {
    let id = req.params.id;
    let { nombre, apellido, email } = req.body;
    try {
        let usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                code: 404,
                message: "El usuario que intenta elimar no existe",
            });
        }

        await usuario.update({
            nombre,
            apellido,
            email,
        });
        console.log("Nuevos datos del usuario".usuario);

        console.log(`Usuario con id ${id} actualizado con éxito.`);
        res.json({
            code: 200,
            message: `Usuario con id ${id} actualizado`,
            usuario,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: `Error al actualizar al usuario con id ${id}.`,
        });
    }
};
