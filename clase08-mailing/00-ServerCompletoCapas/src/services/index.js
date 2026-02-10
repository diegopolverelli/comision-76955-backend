import { ClientesRepository } from "../repository/ClientesRepository.js";
import { ClientesService } from "./Clientes.service.js";
import {MemoryClientesDAO} from "../dao/MemoryClientesDAO.js"
import {MemoryProductosDAO} from "../dao/MemoryProductosDAO.js"
import { ProductosRepository } from "../repository/ProductosRepository.js";
import { MemoryTicketsDAO } from "../dao/MemoryTicketsDAO.js";
import { TicketRepository } from "../repository/TicketRepository.js";

const clientesDAO=new MemoryClientesDAO()
const clientesRepository=new ClientesRepository(clientesDAO)

const productosDAO=new MemoryProductosDAO()
const productosRepository=new ProductosRepository(productosDAO)

const ticketsDAO=new MemoryTicketsDAO()
const ticketsRepository=new TicketRepository(ticketsDAO)

export const clientesService=new ClientesService(
    clientesRepository, 
    productosRepository, 
    ticketsRepository
)