import { Router } from 'express';
// import { UsersManager } from '../dao/UsersManager.js';
import { UsersMongoManager as UsersManager } from '../dao/UsersMongoManager.js';
export const router=Router()

router.get('/',async(req,res)=>{

    try {
        
        // let usuarios="usuarios"
        let usuarios=await UsersManager.getUsers()
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({usuarios})
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }
})

router.post("/", async(req, res)=>{
    let {name, email, ...otrasPropiedades}=req.body   // ... son el operador REST

    if(!name || !email){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`name | email son requeridos`})
    }

    // resto de validaciones pertinentes

    try {
        let nuevoUsuario=await UsersManager.createUser({name, email, ...otrasPropiedades})   // ... son aquí el operador Spread

        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:`Usuario creado`, nuevoUsuario});
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }

})