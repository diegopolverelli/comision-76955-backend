// import { CustomerDAO } from "../dao/CustomersDAO.js";
import { customerService } from "../services/index.js";
import { manejaErrores } from "../utils.js"

export const getCustomers=async(req, res)=>{
    try {
        // let clientes="clientes"
        // let clientes=await CustomerDAO.get()
        let clientes=await customerService.getClientes()

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:clientes});
    } catch (error) {
        manejaErrores(res, error)
    }
}

export const getVentas=async(req, res)=>{
    try {
        let ventas=await customerService.getVentas()

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:ventas});
    } catch (error) {
        manejaErrores(res, error)
    }
}

export const createCustomer=async(req, res)=>{
    try {
        let {razonSocial, cuit, saldo}=req.body

        // validaciones pertinenes a cargo del alumno

        // let nuevoCliente=`Nuevo cliente ${JSON.stringify({razonSocial, cuit, saldo})}`
        // let nuevoCliente=await CustomerDAO.create({razonSocial, cuit, saldo})
        let nuevoCliente=await customerService.createCliente({razonSocial, cuit, saldo})
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:nuevoCliente});
    } catch (error) {
        manejaErrores(res, error)
    }
}