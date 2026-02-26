import { connectToDatabase, sequelize } from './db.js';

async function startServer(app, port) {
    try {
        await connectToDatabase();
        await sequelize
        .sync({ }); // Synchronize models with the database ->
        //  force: true will drop tables if they exist and recreate them
        //  alter: true will update tables if they exist but have different schema
        //  In production, you should use migrations instead of sync to manage your database schema

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
