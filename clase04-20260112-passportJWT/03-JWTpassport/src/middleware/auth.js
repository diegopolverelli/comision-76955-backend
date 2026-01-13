import jwt from "jsonwebtoken"
export const auth=(req, res, next)=>{
    // if(!req.headers.authorization){
    console.log(req.cookies)
    if(!req.cookies.coderToken){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    // BEARER asdflkjasdf.asdflaksdjfasd.as9dfadsf9asd9f
    // let token=req.headers.authorization.split(" ")[1]
    let token=req.cookies.coderToken

    try {
        let user=jwt.verify(token, "password123")
        req.user=user     
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Unauthorized`, detalle: error.message})
    }

    next()
}