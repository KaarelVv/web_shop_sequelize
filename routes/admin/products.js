import express from 'express';
import AdminProductController from '../../controllers/admin/product.js';

const router = express.Router();

// POST /admin/add-product
router.post('/product/add', AdminProductController.addProduct);

export default router;