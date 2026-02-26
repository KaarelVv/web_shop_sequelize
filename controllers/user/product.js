import Product from "../../models/product.js";


class ProductController {

    // Get all products
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json({ products });
        } catch (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ message: 'Failed to fetch products' });
        }
    }
    // Get product by ID
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
    
}

export default new ProductController();
