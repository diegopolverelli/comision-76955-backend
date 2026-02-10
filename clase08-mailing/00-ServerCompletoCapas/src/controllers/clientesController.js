// import { MemoryClientesDAO as DAO } from "../dao/MemoryClientesDAO.js"

import { clientesService } from "../services/index.js";

// let clientesService=new DAO()



async function getClientes(req,res){
    try {
        let clientes=await clientesService.getClientes()
    
        res.status(200).json({clientes})
        
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }

}

async function comprar(req,res){
    try {
        let {cid, productos}=req.body
        // validaciones pertinentes

        // console.log(productos)


        if(!Array.isArray(productos)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El argumento productos debe ser un array de productos válidos en el sistema`})
        }

        let ticket=await clientesService.generarCompra(cid, productos)
    
        res.status(200).json({ticket})
        
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`, mensaje: error.message})
    }

}

export default {getClientes, comprar}