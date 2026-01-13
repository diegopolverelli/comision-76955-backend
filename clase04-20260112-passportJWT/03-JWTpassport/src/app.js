import express from 'express';
import jwt from "jsonwebtoken"
import fs from 'fs'
import cookieParser from "cookie-parser"
// import { auth } from './middleware/auth.js';
import { initPassport } from './config/passport.config.js';
import passport from 'passport';
const PORT = 3000;

const app = express();

app.use(cookieParser())
app.use(express.static("./src/public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// paso 2
initPassport()
app.use(passport.initialize())
// app.use(passport.session())   // solo si usamos Sessions

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

let usuarios = []
if (fs.existsSync('./src/usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
}

app.post('/registro', (req, res) => {
    let { nombre, email, password } = req.body
    if (!nombre || !email || !password) return res.status(400).send('Ingrese todos los datos')

    let usuario = usuarios.find(u => u.email === email)
    if (usuario) return res.status(400).send(`El usuario ${email} ya existe en la DB`)

    let id = 1
    if (usuarios.length > 0) id = usuarios[usuarios.length - 1].id + 1

    usuario = {
        id, nombre, email, password
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json', JSON.stringify(usuarios, null, 5))

    res.json({
        usuarioCreado: usuario
    })
})

app.post('/login', (req, res) => {
    let { email, password } = req.body
    if (!email || !password) return res.status(400).send({ error: 'Ingrese email y password' })

    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

    let usuario = usuarios.find(u => u.email === email && u.password === password)
    if (!usuario) return res.status(401).send({ error: `Error credenciales` })

    // req.session.usuario=usuario
    let token = jwt.sign(usuario, "password123", { expiresIn: "1h" })

    res.cookie("coderToken", token, { httpOnly: true })
    return res.status(200).json({
        message: `Login exitoso!`,
        usuarioLogueado: usuario,
        // token
    })

})

app.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:"Error al autenticar"});
})

// app.get('/usuario', auth, (req,res)=>{
// paso 3
app.get(
    '/usuario',
    passport.authenticate("current", { session: false, failureRedirect: "/error" }),
    (req, res) => {
        // console.log(req.headers)

        // si passport.authenticate "pasa"... deja en la req una propery user

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil usuario ' + req.user.nombre,
        });
    }
);

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
