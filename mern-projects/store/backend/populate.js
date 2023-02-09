require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');
const DUMMY_PRODUCTS = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(DUMMY_PRODUCTS);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
