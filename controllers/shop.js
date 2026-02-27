import Product from '../models/product.js';
import Cart from '../models/cart.js';


class ShopController {


    // Add product to cart
    async addToCart(req, res) {
        try {
            const userId = req.params.userId;
            const productId = req.params.productId;
            const cart = await Cart.findOne({ where: { userId } });

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }
            // Check if the product exists
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            } 
                
            // Add the product to the cart
                
            await cart.addProduct(product, { through: { quantity: 1 } });
                           
            
                res.status(200).json({ message: 'Product added to cart successfully' });
            } catch (err) {
                console.error('Error adding product to cart:', err);
                res.status(500).json({ message: 'Failed to add product to cart' });
            }
        }

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

    // Get cart
    async getCart(req, res) {
            try {
                const userId = req.params.userId;
                const cart = await Cart.findOne({ where: { userId }, include: Product });

                if (!cart) {
                    return res.status(404).json({ message: 'Cart not found' });
                }
                res.status(200).json({ cart });
            } catch (err) {
                console.error('Error fetching cart:', err);
                res.status(500).json({ message: 'Failed to fetch cart' });
            }
        }
    }

export default new ShopController();