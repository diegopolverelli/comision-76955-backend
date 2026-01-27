

export class CustomersService{
    constructor(DAOProductos, DAOClientes){
        this.productsDAO=DAOProductos
        this.customersDAO=DAOClientes
    }

    async getClientes(){
        return this.customersDAO.get()
    }

    async createCliente(cliente){
        return this.customersDAO.create(cliente)
    }

    async getVentas(){
        let clientes=await this.getClientes()
        console.log(clientes)
        let productos=await this.productsDAO.get()
        console.log(productos)

        // clientes.forEach(c=>{  // LOS FOREACH, REDUCE, MAP, etc. no funcionan con await
        //     c.productosMasVendidos.forEach(pmv=>{
        //         let producto=
        //     })
        // })

        for(let i=0; i<clientes.length; i++){
            // console.log(`Procesando cliente ${JSON.stringify(clientes[i])}`)
            for(let j=0; j<clientes[i].productosMasVendidos.length; j++){
                console.log(`Procesando cliente ${JSON.stringify(clientes[i].razonSocial)} | producto ${JSON.stringify(clientes[i].productosMasVendidos[j])}`)
                
                let producto=productos.find(p=>p.id==clientes[i].productosMasVendidos[j].id)
                console.log(producto)
                if(producto){
                    clientes[i].productosMasVendidos[j].title=producto.title
                    clientes[i].productosMasVendidos[j].price=producto.price
                }
            }
        }

        console.log(JSON.stringify(clientes))
        return clientes
    }
}