

export class ClientesService{
    #clientesRepository
    #productosRepository
    #ticketsRepository
    constructor(repoClientes, repoProductos, repoTickets){
        this.#clientesRepository=repoClientes
        this.#productosRepository=repoProductos
        this.#ticketsRepository=repoTickets
    }

    async getClientes(){
        return this.#clientesRepository.getClientes()
    }

    async generarCompra(cid, productos=[]){
        let cliente=await this.#clientesRepository.getClienteById(cid)
        if(!cliente){
            throw new Error(`No existe el cliente con id ${cid}`)
        }

        // cart.products=[{product: 1, quantity: 2}, {product: 2, quantity: 3}]

        // forEach no espera los await (por mas que la función callback sea async)
        // for of o for tradicional

        let error=false
        let errores=[]
        let importe=0

        for(let i=0; i<productos.length; i++){
            let pid=productos[i].pid
            let cantidad=productos[i].cantidad
            let producto=await this.#productosRepository.getProductoById(pid)
            if(!producto || cantidad>producto.stock){
                error=true
                productos[i].error=true
                errores.push(`Problemas con el producto id ${pid}`)
            }else{
                productos[i].descrip=producto.title
                productos[i].error=false
                productos[i].price=producto.price
                productos[i].subtotal=producto.price*cantidad
                productos[i].stock=producto.stock
                productos[i].code=producto.code
                importe=importe+producto.price*cantidad

                // this.productosRepository.update(pid, cantidad)
            }
        }

        let productosOK=productos.filter(p=>p.error==false)
        if(productosOK.length==0){
            throw new Error(`No hay productos en condiciones de ser comprados: ${JSON.stringify(errores)}`)
        }

        let ticket=await this.#ticketsRepository.createTicket(
            {
                ticketID: Date.now(), 
                fecha: new Date().toUTCString(),
                razonSocial: cliente.razonSocial, 
                productos: productosOK, 
                importe,
                errores,
            }
        )

        cliente.compras.push(ticket)
        await this.#clientesRepository.updateCliente(cid, cliente )

        return ticket
    }
}