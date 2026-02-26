import express from 'express';
import productAdminRoutes from './routes/admin/products.js';
import productRoutes from './routes/user/products.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Web Shop API!');
});
// Admin routes
app.use('/admin', productAdminRoutes);

// User routes
app.use('/', productRoutes);


export default app;
