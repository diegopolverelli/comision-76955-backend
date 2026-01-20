import passport from "passport"
import passportJWT from "passport-jwt"
import { config } from "./config.js"

const buscarToken=req=>{
    let token=null

    if(req.cookies.tokencookie){
        token=req.cookies.tokencookie
    }

    return token
}

export const iniciarPassport=()=>{

    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: config.SECRET, 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        },
        async(contenidoToken, done)=>{
            try {
                return done(null, contenidoToken)
            } catch (error) {
                return done(error)
            }
        }
    ))


    // solo si uso sessions
    // passport.serializeUser()
    // passport.deserializeUser()
}