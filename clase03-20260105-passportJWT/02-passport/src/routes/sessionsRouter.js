import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import { createHash, validaPass } from '../utils.js';
import passport from 'passport';
export const router=Router()

let usersManager=new UsuariosManagerMongo()

// router.post('/register',async(req,res)=>{

//     let {nombre, email, password}=req.body
//     if(!nombre || !email || !password){
//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`nombre | email | password son requeridos`})
//     }

//     try {
//         let existe=await usersManager.getBy({email})
//         if(existe){
//             res.setHeader('Content-Type','application/json');
//             return res.status(400).json({error:`Ya existe un usuario con email ${email}`})
//         }
        
//         // resto validaciones pertinentes

//         password=createHash(password)

//         let nuevoUsuario=await usersManager.create({nombre, email, password})

//         res.setHeader('Content-Type','application/json')
//         res.status(201).json({message:`Registro exitoso!`, nuevoUsuario})
//     } catch (error) {
//         console.log(error)
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Internal server error`})
//     }

// })

router.post(
    "/register", 
    // paso 3
    passport.authenticate("register", {failureRedirect:"/api/sessions/error"}), 
    (req, res)=>{
        // si passport.authenticate sale bien va a dejar en la request
        // una property user

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Registro exitoso para ${req.user.nombre}`, nuevoUsuario: req.user});
    }
)

router.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`Error al autenticar...!!!`})
})

// router.post('/login',async(req,res)=>{

//     let {email, password}=req.body
//     if(!email || !password){
//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`email | password son requeridos`})
//     }

//     try {
//         let usuario=await usersManager.getBy({email})
//         if(!usuario){
//             res.setHeader('Content-Type','application/json');
//             return res.status(401).json({error:`Credenciales inválidas`})
//         }
        
//         if(!validaPass(password, usuario.password)){
//             res.setHeader('Content-Type','application/json');
//             return res.status(401).json({error:`Credenciales inválidas`})
//         }

//         // quitar datos sensibles
//         delete usuario.password

//         req.session.usuario=usuario

//         res.setHeader('Content-Type','application/json')
//         res.status(201).json({message:`Login exitoso!`, usuario})
//     } catch (error) {
//         console.log(error)
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Internal server error`})
//     }

// })

router.post(
    "/login", 
    passport.authenticate("login", {failureRedirect: "/api/sessions/error"}), 
    (req, res)=>{
        // si passport.authenticate sale bien va a dejar en la request
        // una property user   (req.user)

        req.session.usuario=req.user

        res.setHeader('Content-Type','application/json')
        res.status(201).json({message:`Login exitoso!`, usuario:req.user})
    }
)

router.get("/logout", (req, res)=>{
    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error al realizar logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso"});
    })
})