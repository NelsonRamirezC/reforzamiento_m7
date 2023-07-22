import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as userController from "./controllers/usuarios.controller.js"
import * as deptoController from "./controllers/departamentos.controller.js";
import * as beneficioController from "./controllers/beneficios.controller.js";

const app = express();

//middlewares generales del proyecto.
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS
//rutas para usuario
app.get("/api/usuarios", userController.findAll);
app.post("/api/usuarios", userController.create);
app.get("/api/usuarios/:id", userController.findById);
app.delete("/api/usuarios/:id", userController.deleteById);
app.put("/api/usuarios/:id", userController.updateById);

//rutas para departamentos
app.get("/api/departamentos", deptoController.findAll);
app.post("/api/departamentos", deptoController.create);
app.post("/api/departamentos/addintegrante", deptoController.agregarIntegrante);

//ruta para beneficios
app.get("/api/beneficios", beneficioController.findAll);
app.post("/api/beneficios", beneficioController.create);
app.post("/api/beneficios/addbeneficiario", beneficioController.agregarBeneficiario);



//RUTA POR DEFECTO

app.all("*", (req, res) => {
    res.status(404).send("Ruta desconocida.")
})

export default app;