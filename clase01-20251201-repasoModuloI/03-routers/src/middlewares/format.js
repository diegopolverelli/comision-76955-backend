export const formatName=(req, res, next)=>{
    if(req.body.nombre){
        req.body.nombre=req.body.nombre.toUpperCase()
    }

    next()
}