// import { ProductDAO } from "../dao/ProductsDAO.js";
import { productsService } from "../services/index.js";
import { manejaErrores } from "../utils.js";

export class ProductController{
    static async getProducts(req, res){
        try {
            // let productos="listado productos"
            // let productos=await ProductDAO.get()
            let productos=await productsService.getProduts()

            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:productos});
        } catch (error) {
            manejaErrores(res, error)
        }
    }

    static async createProduct(req, res){
        try {
            let product=req.body

            // validaciones pertinentes por cuenta del alumno...

            // let nuevoProducto=`Nuevo producto ${JSON.stringify(product)}`
            // let nuevoProducto=await ProductDAO.create(product)
            let nuevoProducto=await productsService.createProduct(product)
            res.setHeader('Content-Type','application/json');
            return res.status(201).json({payload:nuevoProducto});
        } catch (error) {
            manejaErrores(res, error)
        }
    }
}