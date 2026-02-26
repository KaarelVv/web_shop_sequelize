import { connectToDatabase, sequelize } from './db.js';

async function startServer(app, port) {
    try {
        await connectToDatabase();
        await sequelize.sync({ alter: true }); // Sync models with the database
        console.log('Database synchronized successfully.');
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
