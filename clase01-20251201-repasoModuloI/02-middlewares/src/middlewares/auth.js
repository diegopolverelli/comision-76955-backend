export const auth=(req, res, next)=>{
    let {name, password}=req.query
    console.log(name, password)    
    if(name!="admin" || password!="123456"){

        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales invalidas`})
    }

    next()
}