const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose()
const userSchema = require('./models/users-schema')
const productSchema = require('./models/products-schema')
const cartSchema = require('./models/carts-schema')
const cartItemsSchema = require('./models/cart-items-schema')
const authRouter = require('./models/auth-router')
// const userRouter = require('./routes/user-router')
require('dotenv').config();

const app = express();
app.use(cors());

const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.log("Something went wrong");
  }
  console.log('Connected to the database.');
});

userSchema.createUsers(db)
productSchema.createProducts(db)
cartSchema.createCarts(db)
cartItemsSchema.createCartItems(db)

// app.use('/users', userRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


