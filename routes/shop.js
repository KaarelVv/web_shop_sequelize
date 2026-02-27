import express from 'express';
import ShopController from '../controllers/shop.js';

const router = express.Router();

// Get cart
router.get('/cart/:userId', ShopController.getCart);

// Get all products
router.get('/products', ShopController.getAllProducts);

// Add product to cart
router.post('/cart/:userId/add/:productId', ShopController.addToCart);

export default router;