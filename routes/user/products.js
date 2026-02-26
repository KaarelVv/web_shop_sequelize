import express from 'express';
import ProductController from '../../controllers/user/product.js';

const router = express.Router();

// GET all products
router.get('/products', ProductController.getAllProducts);

// GET product by ID
router.get('/products/:id', ProductController.getProductById);

export default router;
