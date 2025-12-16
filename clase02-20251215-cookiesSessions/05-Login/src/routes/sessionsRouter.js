import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import { createHash } from '../utils.js';
export const router=Router()

let usersManager=new UsuariosManagerMongo()

router.post('/register',async(req,res)=>{

    let {nombre, email, password}=req.body
    if(!nombre || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre | email | password son requeridos`})
    }

    try {
        let existe=await usersManager.getBy({email})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya existe un usuario con email ${email}`})
        }
        
        // resto validaciones pertinentes

        password=createHash(password)

        let nuevoUsuario=await usersManager.create({nombre, email, password})

        res.setHeader('Content-Type','application/json')
        res.status(201).json({mesaage:`Registro exitoso!`, nuevoUsuario})
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }

})