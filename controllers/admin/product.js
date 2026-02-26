import Product from '../../models/product.js';

class AdminProductController {
    // Create a new product
    async addProduct(req, res) {
        try {
            const product = await Product.create({
                title: req.body.title,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                description: req.body.description,
                userId: req.body.userId // Assuming the user ID is sent in the request body; in a real app, you'd get this from the authenticated user session
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
    // Get all products (for admin view)
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json({ products });
        } catch (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ message: 'Failed to fetch products' });
        }
    }

    // Get product by ID (for admin view)
    async getProductById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ product });
        } catch (err) {
            console.error('Error fetching product:', err);
            res.status(500).json({ message: 'Failed to fetch product' });
        }
    }

    // Update a product by ID
    async updateProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            // Update product fields if provided, otherwise keep existing values
            // TODO: Consider validating input data before updating
            // TODO: Handle cases where price is 0 or empty string, which would be falsy in the current logic
            await product.update({
                title: req.body.title || product.title, // Keep existing title if not provided
                price: req.body.price || product.price, // Keep existing price if not provided
                imageUrl: req.body.imageUrl || product.imageUrl, // Keep existing imageUrl if not provided
                description: req.body.description || product.description, // Keep existing description if not provided
                });
            console.log('update body:', req.body);
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (err) {
            console.error('Error updating product:', err);
            res.status(500).json({ message: 'Failed to update product' });
        }
    }

    // Delete a product by ID
    async deleteProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await product.destroy();
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ message: 'Failed to delete product' });
        }
    }

}

export default new AdminProductController();

    