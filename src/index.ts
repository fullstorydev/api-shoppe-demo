import express from 'express';
import { PingController } from './controllers';

// read config
const {
  PORT = 3000,
} = process.env;

// create and configure Express
const app = express();

// create controllers
const ping = new PingController();

// add controllers to routes
app.get('/api/ping', ping.getPing);

// start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));