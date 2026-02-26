import express from 'express';
import { startServer } from './utils/server.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Web Shop API!');
});

startServer(port);
