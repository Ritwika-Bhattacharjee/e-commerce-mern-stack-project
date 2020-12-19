const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/connectdb.js');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const authRoutes = require('./routes/auth.js');
const productRoutes = require('./routes/product.js');
const customerRoutes = require('./routes/customer.js');
const cartRoutes = require('./routes/cart.js');
const orderRoutes = require('./routes/order.js');

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/customer', customerRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});