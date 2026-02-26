// Connect to database
import Sequelize from 'sequelize';
import { loadModels } from '../models/index.js';
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/web_shop');

// Test database connection
async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        await loadModels();
        console.log('Connection has been established to the database successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        throw err;
    }
}


export { connectToDatabase, sequelize };
