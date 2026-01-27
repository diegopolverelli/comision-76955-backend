import { CustomerDAO } from "../dao/CustomersDAO.js";
import { ProductDAO } from "../dao/ProductsDAO.js";
import { CustomersService } from "./Customers.service.js";
import { ProductsService } from "./Products.service.js";

export const productsService=new ProductsService(ProductDAO)
export const customerService=new CustomersService(ProductDAO, CustomerDAO)