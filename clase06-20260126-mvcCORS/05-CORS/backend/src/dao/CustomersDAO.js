const clientes=[
    {
        id: 1, razonSocial: "Empresa 01", cuit:" 30999999998", saldo:1000, 
        productosMasVendidos: [
            {
                id: 2, cant: 1000
            }, 
            {
                id: 5, cant: 970
            }, 
        ]
    },
    {
        id: 2, razonSocial: "Empresa 02", cuit:" 30999999997", saldo:2800,
        productosMasVendidos: [
            {
                id: 1, cant: 3200
            }, 
            {
                id: 7, cant: 104
            }, 
        ]
    },
]

export class CustomerDAO{
    static async get(){
        return clientes
    }

    static async create(cliente){
        let id=1
        if(clientes.length>0){
            id=Math.max(...clientes.map(d=>d.id))+1
        }

        let nuevoCliente={id, ...cliente}

        clientes.push(nuevoCliente)

        return nuevoCliente
    }
}