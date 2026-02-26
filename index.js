import express from 'express';
import { connectToDatabase } from './utils/db.js';

const app = express();
const port = 3000;


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Web Shop API!');
});

async function startServer() {
    try {
        await connectToDatabase();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Server startup failed:', err);
        process.exit(1);
    }
}

startServer();
