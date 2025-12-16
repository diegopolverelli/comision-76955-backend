import express from 'express';
import sessions from "express-session"
import { auth } from './middleware/auth.js';
import MongoStore from "connect-mongo"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(sessions({
    secret: "CoderCoder123", 
    resave: true, 
    saveUninitialized: true, 
    store: MongoStore.create(
        {
            mongoUrl: "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ,
            dbName: "comisPruebas", 
            ttl: 60*10, 
            // collectionName: "misSessions",
        }
    )
}))

app.get('/',(req,res)=>{

    if(req.session.contador){
        req.session.contador=req.session.contador+1
    }else{
        req.session.contador=1
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Home Page - visitas: ${req.session.contador}`});
})

let usuarios=[
    {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
    {id:2, nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
    {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
]

app.post("/login", (req, res)=>{

    let {nombre, password}=req.body
    if(!nombre || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete los datos`})
    }

    let usuario=usuarios.find(u=>u.nombre==nombre && u.password==password)
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales inválidas`})
    }

    req.session.usuario=usuario

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Login exitoso`, usuarioLogueado: usuario});
})

app.get("/logout", (req, res)=>{

    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Fallo al procesar logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Logout exitoso!`});
    })
})

app.get('/datos', auth, (req,res)=>{


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"datos privados de "+req.user.nombre});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
