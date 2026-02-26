import express from 'express';
import AdminProductController from '../../controllers/admin/product.js';
import e from 'express';

const router = express.Router();

// POST create a new product
router.post('/product/add', AdminProductController.addProduct);

// GET all products (for admin view)
router.get('/products', AdminProductController.getAllProducts);

// GET product by ID (for admin view)
router.get('/product/:id', AdminProductController.getProductById);

// PUT edit product by ID when params is true
router.put('/product/:id', (req, res, next) => {
    if (req.query.edit !== 'true') {
        return res.status(403).json({ message: 'Edit not allowed without edit=true query parameter' });
    }
    return AdminProductController.updateProduct(req, res, next);
}
);

// DELETE a product by ID
router.delete('/product/:id', AdminProductController.deleteProduct);

export default router;

