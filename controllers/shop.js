import Product from '../models/product.js';
import Cart from '../models/cart.js';
import CartItem from '../models/cart-item.js';
import Order from '../models/order.js';
import OrderItems from '../models/order-items.js';



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
            await cart.addProduct(product);
            const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId: product.id } });

            // Check if cartItem exist
            if (!cartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            // Increment the quantity
            cartItem.quantity++;
            await cartItem.save();
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

    //Substract or remove product from cart
    async removeFromCart(req, res) {
        try {
            const cartId = req.params.cartId;
            const productId = req.params.productId;

            const cartItem = await CartItem.findOne({ where: { cartId, productId } });
            if (!cartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                await cartItem.save();
                res.status(200).json({ message: 'Product quantity updated successfully' });
            } else {
                await cartItem.destroy();
                res.status(200).json({ message: 'Product removed from cart successfully' });
            }
        } catch (err) {
            console.error('Error removing product from cart:', err);

        }
    }

    // Add new order
    async createOrder(req, res) {
        try {
            const userId = req.params.userId;
            const cart = await Cart.findOne({ where: { userId } });
            const items = await CartItem.findAll({ where: { cartId: cart.id } });

            OrderItems.create({
                products: items
            });

            let totalPrice = 0;

            cart.products.forEach(async (product) => {
                totalPrice += product.price;
            });

            Order.create({
                totalPrice: totalPrice,
                userId: userId
            });
            res.status(201).json({ message: 'Order created successfully' });

        }
        catch (err) {
            console.error('Error adding order:', err);
            res.status(500).json({ message: 'Failed to add order' });
        }
    }
}


export default new ShopController();




