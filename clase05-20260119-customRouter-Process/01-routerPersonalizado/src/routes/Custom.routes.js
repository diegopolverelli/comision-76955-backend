import {Router} from "express"

export class CustomRouter{
    #router

    constructor(){
        this.#router=Router()
        this.init()
    }

    init(){}

    getRouter(){
        return this.#router
    }

    get(ruta="", ...funciones){   // que son aquí los ...??? REST
        this.#router.get(ruta, this.customResponses, this.precesaFunciones(funciones))  
    }

    precesaFunciones=(funciones=[])=>{   // (req, res, next)=>..., (req, res)=>
        return funciones.map(fn=>(...params)=>{   // ...operador rest
            try {
                return fn(...params)  // ...operador spread
            } catch (error) {
                return params[1].internalServerError(error.message)
            }
        })
    }

    customResponses=(req, res, next)=>{
        res.success=message=>res.status(200).json({
            status:"OK", 
            message
        })

        res.badRequest=error=>res.status(400).json({
            status:"bad Request", 
            error
        })

        res.internalServerError=error=>res.status(500).json({
            status:"Internal Server Error", 
            error
        })

        next()
    }
}

// const pruebaRouter=new CustomRouter()

// pruebaRouter.router.post("/", (req, res)=>)
