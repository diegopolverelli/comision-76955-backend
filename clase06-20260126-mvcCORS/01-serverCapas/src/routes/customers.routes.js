import { Router } from 'express';
import { createCustomer, getCustomers, getVentas } from '../controllers/customersController.js';
export const router=Router()

router.get('/', getCustomers)
router.get('/ventas', getVentas)
router.post('/', createCustomer)