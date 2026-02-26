import express from 'express';
import { connectToDatabase, sequelize } from './db.js';
const app = express();

    
async function startServer(port) {
    try {
        await connectToDatabase();
        sequelize
        .sync({ alter: true })
        .then(() => {
            console.log('Database synchronized successfully.');
            app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
        })
        
    } catch (err) {
        console.error('Server startup failed:', err);
        process.exit(1);
    }
}

export { startServer };