export class ProductosRepository{
    #productosDAO
    constructor(dao){
        this.#productosDAO=dao
    }

    async getProductos(){
        return await this.#productosDAO.get()
    }

    async getProductoById(id){
        let productos=await this.getProductos()
        return productos.find(p=>p.id==id)
    }
}