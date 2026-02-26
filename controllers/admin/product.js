import e from 'express';
import Product from '../../models/product.js';

class AdminProductController {

    async addProduct(req, res) {
        try {
            const product = await Product.create({
                title: req.body.title,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                description: req.body.description
            });
            res.status(201).json({
                 message: 'Product created successfully', 
                 productId: product.id
                 });
        }
        catch (err) {
            console.error('Error creating product:', err);
            res.status(500).json({ message: 'Failed to create product' });
        }
    }
}

export default new AdminProductController();

    