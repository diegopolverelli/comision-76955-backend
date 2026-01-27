import { Router } from 'express';
import { ProductController } from '../controllers/ProductsController.js';
export const router=Router()

router.get('/', ProductController.getProducts )
router.post("/", ProductController.createProduct)