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