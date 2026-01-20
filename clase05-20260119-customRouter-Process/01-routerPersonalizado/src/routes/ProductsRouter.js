import { midd01 } from "../middlewares/middlewares.js";
import { CustomRouter } from "./Custom.routes.js";

export class ProductsRouter extends CustomRouter{
    init(){
        this.get("/", midd01, (req, res)=>{

            if(req.query.error){
                return res.badRequest("prueba de salida de errores")
            }

            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload:`GET /api/products`});

            res.success("GET /api/products")
        })

        this.get("/precios", (req, res)=>{

            if(req.query.error){
                throw new Error("error de pruebas II")
            }

            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload:`GET /api/products`});

            res.success("GET /api/products/precios")
        })

    }
}