const errorMiddlerare = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const connectDB = require('./db/connect');
const productsRoutes = require('./routes/products');
require('express-async-errors');
require('dotenv').config();

const express = require('express');

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/v1/products', productsRoutes);

// products route
app.use(notFoundMiddleware);
app.use(errorMiddlerare);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
