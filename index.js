import app from "./app/app.js";
import sequelize from "./app/config/database.config.js";

import "./app/models/asociaciones.js";

const main = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false, alter: true });
        console.log("Conectados a la base de datos.");
        app.listen(3000, () =>
            console.log("Servidor escuchando en puerto 3000")
        );
    } catch (error) {
        console.log("error al inciar la aplicación.");
    }
};

main();
