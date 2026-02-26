// Connect to database
import Sequelize from 'sequelize';
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/web_shop');

// Test database connection
async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established to the database successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        throw err;
    }
}


export { connectToDatabase };
