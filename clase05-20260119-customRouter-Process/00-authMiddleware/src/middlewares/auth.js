export const isAdmin=(req, res, next)=>{
    if(req.user.rol!="admin"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({error:`No tiene privilegios suficientes para ejecutar el recurso solicitado`})
    }

    next()
}

export const isUser=(req, res, next)=>{
    console.log(req.user)
    console.log(req.user.rol)
    if(req.user.rol!="user"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({error:`No tiene privilegios suficientes para ejecutar el recurso solicitado`})
    }

    next()
}

export const auth=(permisos=[])=>{
    return (req, res, next)=>{
        if(!Array.isArray(permisos)){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Problemas con los permisos de la ruta. Contacte al administrador`})
        }

        permisos=permisos.map(p=>p.toUpperCase())

        if(permisos.includes("PUBLIC")){
            return next()
        }

        if(!req.user || !req.user.rol){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`No hay usuarios autenticados o falta rol`})
        }

        if(!permisos.includes(req.user.rol.toUpperCase())){
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficientes para ejecutar el recurso solicitado`})
        }

        next()
    }
}