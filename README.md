# api-shoppe-demo

This project provides a backend for *framework*-shoppe-demo apps. The api-shoppe-demo is a simple [Express](https://expressjs.com/) server with middleware that facilitates API calls.

## Getting started

You'll need [Node.js](nodejs.org) to run or modify the application.  Once you have node installed, then download or clone this repo.

Install and start the server with the following commands.

```bash
cd api-shoppe-demo
npm install
npm run build
npm start
```

You should see a *Server listening on port 3000* message.  Then open [http://localhost:3000/api/ping](http://localhost:3000/api/ping) in your browser to receive a `hello` message.

## Services

All services have the base route `/api`. Callers should use `http://localhost:3000/api/{service_name}` for example.

| Method | Route | Description |
| ------ | ----- | ----------- |
| GET    | /ping | Gets a JSON message; used as a health check |
| GET    | /products | Gets a list of products in the catalog; appen the `?q=keyword` query string to search |
| GET    | /products/:id | Gets an individual product by ID from the catalog |
