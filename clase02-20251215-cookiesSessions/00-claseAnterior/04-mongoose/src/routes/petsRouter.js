import { Router } from 'express';
export const router=Router()
// import express from "express"
// export const router=express.Router()

router.get('/',(req,res)=>{

    let pets="mascotas"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({pets})
})

router.post("/", (req, res)=>{
    let nuevaMascota={
        id:1, name:"Rocky", specie:"dog"
    }

    res.setHeader('Content-Type','application/json');
    return res.status(201).json({nuevaMascota});
})