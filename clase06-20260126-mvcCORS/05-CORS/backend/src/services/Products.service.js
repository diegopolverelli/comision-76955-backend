import { ProductDAO } from "../dao/ProductsDAO.js"

// let productsDAO=new ProductDAO() // solo si los metodos del DAO no fuesen static
// let productsService=new ProductsService(productsDAO)

export class ProductsService{
    constructor(DAO){
        this.productsDAO=DAO
    }

    async getProduts(){
        return await this.productsDAO.get()
    }

    async createProduct(producto){
        return await this.productsDAO.create(producto)
    }
}