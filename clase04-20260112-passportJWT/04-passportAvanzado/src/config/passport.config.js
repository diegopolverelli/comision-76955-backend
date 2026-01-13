import passport from "passport"
import passportJWT from "passport-jwt"
import local from "passport-local"
import fs from "fs"

const buscaToken=req=>{
    let token=null

    if(req.cookies.coderToken){
        token=req.cookies.coderToken
    }

    return token
}

export const initPassport=()=>{

    // PASO 1
    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: "password123", 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscaToken])
        }, 
        async(usuario, done)=>{
            try {
                // return done(null, false)
                if(usuario.nombre=="Juan"){
                    return done(null, false, {message:`El usuario Juan tiene el acceso temporalmente inhabilitado. Contacte a RRHH`})
                }
                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {
            usernameField: "email", 
            // passReqToCallback: true
        }, 
        async(username, password, done)=>{
            try {
           
                let usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))
            
                let usuario = usuarios.find(u => u.email === username && u.password === password)
                if (!usuario) {
                    // return res.status(401).send({ error: `Error credenciales` })
                    return done(null, false, {message: `Credenciales inválidas...!!! `})
                }

                return done(null, usuario)
                            
            } catch (error) {
                return done(error)
            }
        }
    ))


    // PASO 1' o 1 bis (SOLO SI USO SESSIONS...!!!)
    // passport.serializeUser()
    // passport.deserializeUser()
}


