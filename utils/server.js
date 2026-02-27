import { connectToDatabase, sequelize } from './db.js';
import User from '../models/user.js';
import Product from '../models/product.js';




async function startServer(app, port) {
    try {

        await connectToDatabase();

        await sequelize
            .sync({ force: true }); // Synchronize models with the database ->
        //  force: true will drop tables if they exist and recreate them
        //  alter: true will update tables if they exist but have different schema
        //  In production, you should use migrations instead of sync to manage your database schema

        console.log('Database synchronized successfully.');
        // add test user to the database
        const testUser = await User.create({
            name: 'Test User',
            email: 'testuser@example.com',
            passwordHash: 'password123'
        });
        //add test cart to the database
        await testUser.createCart();

        // add test product to the database
       await Product.create({
            title: 'Test Product',
            price: 10.99,
            imageUrl: 'https://example.com/product-image.jpg',
            description: 'This is a test product.',
            userId: testUser.id
        });

        console.log('Test user created successfully.');
        const server = app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
        return server;
    } catch (err) {
        console.error('Server startup failed:', err);
        process.exit(1);
    }
}

export { startServer };
