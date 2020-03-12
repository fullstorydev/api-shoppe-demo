import cors from 'cors';
import express from 'express';
import { PingController } from './controllers';
import { getProduct, getProducts } from './controllers/ProductController';

// read config
const {
  PORT = 3000,
} = process.env;

// create and configure Express
const app = express();

// add CORS to allow local testing
app.use(cors());

// create controllers
const ping = new PingController();

// add controllers to routes
app.get('/api/ping', ping.getPing);
app.get('/api/products', getProducts);
app.get('/api/products/:id', getProduct);

// start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));