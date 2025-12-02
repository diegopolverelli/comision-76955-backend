import express from 'express';
import { logger } from './middlewares/log.js';
import { formatName } from './middlewares/format.js';
import { auth } from './middlewares/auth.js';

import { router as petsRouter } from './routes/petsRouter.js';
import { router as usersRouter } from './routes/usersRouter.js';
import { conectarDB } from './config/db.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))
app.use(logger)

app.use("/api/pets", petsRouter)
app.use("/api/users", usersRouter)

app.get('/', (req, res) => {

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

app.get("/pruebas", (req, res) => {

    let { nombre = "no especificado", email = "no especificado" } = req.query

    // console.log(req.headers)

    // logica
    // validaciones
    // formateo de datos

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "pruebas", nombre, email });
})

app.post(
    "/usuario",
    auth,
    formatName,
    logger,
    async (req, res) => {

        // validaciones
        let { nombre, email, edad } = req.body
        if (!nombre || !email) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `nombre | email son requeridos` })
        }

        let reLargo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
        if (!reLargo.test(email)) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `formato de email incorrecto` })
        }

        try {

            let nuevoUsuario = {
                nombre, email, edad, role: "user", id: 100
            }

            // grabar en DB
            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json({ nuevoUsuario });
        } catch (error) {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json(
                {
                    error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    // detalle:`${error.message}`
                }
            )
        }


    }
)

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});


conectarDB(
    "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    "comisPruebas"
)




