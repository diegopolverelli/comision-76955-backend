import passport from "passport"
import local from "passport-local"
import { UsuariosManagerMongo } from "../dao/UsuariosManagerMONGO.js"
import { createHash, validaPass } from "../utils.js"

let usersManager=new UsuariosManagerMongo()

export const inicializarPassport=()=>{

    // paso 1
    passport.use("register", new local.Strategy(
        {
            //username, password
            usernameField: "email", 
            // passwordField: "clave", 
            passReqToCallback: true
        },
        async(req, username, password, done)=>{
            try {
                let {nombre}=req.body
                if(!nombre){
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(400).json({error:`nombre es requeridos`})
                    return done(null, false)
                }

                let existe=await usersManager.getBy({email:username})
                if(existe){
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(400).json({error:`Ya existe un usuario con email ${email}`})
                    return done(null, false)
                }
                
                // resto validaciones pertinentes
        
                password=createHash(password)
        
                let nuevoUsuario=await usersManager.create({nombre, email: username, password})
        
                // res.setHeader('Content-Type','application/json')
                // res.status(201).json({message:`Registro exitoso!`, nuevoUsuario})
                            
                return done(null, nuevoUsuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {
            usernameField:"email",
        }, 
        async(username, password, done)=>{
            try {
                let usuario=await usersManager.getBy({email: username})
                if(!usuario){
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(401).json({error:`Credenciales inválidas`})
                    return done(null, false)
                }
                
                if(!validaPass(password, usuario.password)){
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(401).json({error:`Credenciales inválidas`})
                    return done(null, false)
                }
        
                // quitar datos sensibles
                delete usuario.password

                return done(null, usuario)
                        
            } catch (error) {
                return done(error)
            }
        }
    ))

    // paso 1' o paso 1 bis   (SOLO SI USAMOS SESSIONS...!!!!)
    passport.serializeUser((usuario, done)=>{
        return done(null, usuario._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario=await usersManager.getBy({_id: id})
        return done(null, usuario)
    })

}