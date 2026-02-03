import { config } from "../config/config.js";
import { Singleton } from "../config/Singleton.js";


const PERSISTENCE = config.PERSISTENCE
export let DAO

switch (PERSISTENCE) {
    case "FS":
        // DAO=(await import("./usuariosFsDAO.js")).usuariosFsDAO

        let importDAO = await import("./usuariosFsDAO.js")
        DAO = importDAO.usuariosFsDAO

        break;

    case "MONGODB":
        Singleton.conectarDB(
            config.MONGO_URL,
            config.DB_NAME
        )
        DAO = (await import("./usuariosMongoDAO.js")).usuariosMongoDAO

        break;

    default:
        throw new Error(`Error en definición de persistencia`)
    // break;
}

