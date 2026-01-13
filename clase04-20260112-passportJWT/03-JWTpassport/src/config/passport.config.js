import passport from "passport"
import passportJWT from "passport-jwt"

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


