const express = require('express');
const nodemailer = require("nodemailer");
const router2 = new express.Router();
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const cron = require('node-cron');
require('dotenv').config();
require('./db/cun');
const PhoneData = require('./db/Schema3');
const User = require('./db/Schema4');
const list = require('./db/Schema');
const category = require('./db/Schema2');
const Order = require('./db/orderSchema');
const Cart = require('./db/cart');

router2.use(express.json());
router2.use(express.urlencoded({ extended: true }));
router2.use(bodyParser.json());

router2.post('/phondata/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const data = req.body;

        const newProduct = {
            image: [
                {
                    img_1: data.image1,
                    img_2: data.image2,
                    img_3: data.image3
                }
            ],
            Price: data.price,
            Title: data.productName,
            Brand: data.brand,
            Operating_System: data.operatingSystem,
            Memory_Storage: data.memoryStorage,
            Model_Name: data.modelName,
            Screen_Size: data.screenSize,
            image_1: data.image4,
            image_2: data.image5,
            image_3: data.image6,
            image_4: data.image7
        };

        const update = {
            $push: { [category]: newProduct }
        };

        const phoneData = await PhoneData.findOneAndUpdate(
            {},
            update,
            { new: true, upsert: true }
        );

        res.status(201).send(phoneData);
    } catch (e) {
        console.error('Error:', e);
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
});

router2.post('/mycontact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'mssavani99@gmail.com',
                pass: 'mkugpmlfovbghdfg',

            }
        });
        const info = await transporter.sendMail({
            from: email,
            to: 'mssavani99@gmail.com',
            subject: subject,
            text: `${name}:- ${message}`,
            html: `<b>${name}:- ${message}</b>`,
        });
        console.log('Message sent: %s', info.messageId);
        res.status(201).json(true);
    } catch (error) {
        res.status(401).json(error);
    }
});
router2.post('/users/:id', async (req, res) => {
    try {

        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                upsert: true
            }
        );
        await list.findByIdAndUpdate(userId, {
            Email: updateData.email,
        }, {
            new: true
        });

        res.json(updatedUser);
    } catch (err) {
        console.error("Error updating or creating user:", err);
        res.status(500).send(err);
    }
});

router2.post('/api/items/:id', async (req, res) => {
    const id = req.params.id;
    const {
        productName,
        price,
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        brand,
        operatingSystem,
        memoryStorage,
        modelName,
        screenSize
    } = req.body;

    const categories = ['Iphone', 'Samsung', 'OnePlus', 'Vivo', 'Motorola', 'IQoo'];
    const updateFields = categories.reduce((fields, category) => {
        fields[`${category}.$[elem].Title`] = productName;
        fields[`${category}.$[elem].Price`] = price;
        fields[`${category}.$[elem].image.0.img_1`] = image1;
        fields[`${category}.$[elem].image.0.img_2`] = image2;
        fields[`${category}.$[elem].image.0.img_3`] = image3;
        fields[`${category}.$[elem].image_1`] = image4;
        fields[`${category}.$[elem].image_2`] = image5;
        fields[`${category}.$[elem].image_3`] = image6;
        fields[`${category}.$[elem].image_4`] = image7;
        fields[`${category}.$[elem].Brand`] = brand;
        fields[`${category}.$[elem].Operating_System`] = operatingSystem;
        fields[`${category}.$[elem].Memory_Storage`] = memoryStorage;
        fields[`${category}.$[elem].Model_Name`] = modelName;
        fields[`${category}.$[elem].Screen_Size`] = screenSize;
        return fields;
    }, {});

    try {
        const updateResult = await PhoneData.updateMany(
            {
                $or: categories.map(category => ({ [`${category}._id`]: id }))
            },
            { $set: updateFields },
            {
                arrayFilters: [{ 'elem._id': id }],
                multi: true
            }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).send({ message: 'Item not found in any category' });
        }

        res.json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

const razorpay = new Razorpay({
    key_id: 'rzp_test_Z1PlQFw9JxaYjN',
    key_secret: 'xZ5Hs1BJAAGvl0aFDLCgRXpS',
});

router2.post('/createOrder', async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: Number(amount) * 100,
        currency: currency || 'INR',
        receipt: `receipt_order_${Date.now()}`,
        payment_capture: 1,
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating Razorpay order');
    }
});


router2.post('/order_product', async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = new Order(orderData);
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


router2.get('/api/orders', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});


router2.delete('/api/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId);
    res.json({ message: 'Order deleted' });
});

router2.post('/confirm', async (req, res) => {
    const { orderId, email } = req.body;
    try {

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send('Order not found');
        }


        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'mssavani99@gmail.com',
                pass: 'mkugpmlfovbghdfg',
            }
        });

        const mailOptions = {
            from: 'mssavani99@gmail.com',
            to: email,
            subject: 'Order Confirmation',
            text: `Hello Mr ${order.name} Your order for ${order.product_name} price:-${order.price} ${order.image} will be delivered today! Thank you for shopping with us.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send('Error sending email: ' + error.toString());
            } else {
                return res.status(200).send('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        res.status(500).send('Server error: ' + error.toString());
    }
});

cron.schedule(' 00 06 * * *', async () => {
    try {
        const orders = await Order.find();
        const currentTime = new Date().toLocaleDateString();

        orders.forEach(item => {
            const orderDate = new Date(item.order_date).toLocaleDateString();
            if (currentTime === orderDate) {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'mssavani99@gmail.com',
                        pass: 'mkugpmlfovbghdfg',
                    }
                });

                const mailOptions = {
                    from: 'mssavani99@gmail.com',
                    to: item.email,
                    subject: 'Today Delivery',
                    text: `Hello Mr ${item.name} Your order for ${item.product_name} price:-${item.price} ${item.image} will be delivered today! Thank you for shopping with us.`,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error.toString());
                    } else {
                        console.log('Email sent successfully:', info.response);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error processing orders:', error.toString());
    }
});


router2.get('/api/items/:id', async (req, res) => {
    const id = req.params.id;
    try {

        const updateResult = await PhoneData.findOne({
            $or: [
                { 'Iphone._id': id },
                { 'Samsung._id': id },
                { 'OnePlus._id': id },
                { 'Vivo._id': id },
                { 'Motorola._id': id },
                { 'IQoo._id': id }

            ]
        });

        if (!updateResult) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let foundProduct = null;
        for (const category of ['Iphone', 'Samsung', 'OnePlus', 'Vivo', 'Motorola', 'IQoo']) {
            const productsArray = updateResult[category];
            if (productsArray) {
                foundProduct = productsArray.find(product => product._id.toString() === id);
                if (foundProduct) break;
            }
        }

        if (foundProduct) {
            return res.json(foundProduct);
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }

    } catch (error) {
        console.error('Error retrieving product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


router2.delete('/api/items/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await PhoneData.updateOne(
            {
                $or: [
                    { 'Iphone._id': id },
                    { 'Samsung._id': id },
                    { 'OnePlus._id': id },
                    { 'Vivo._id': id },
                    { 'Motorola._id': id },
                    { 'IQoo._id': id }

                ]
            },
            {
                $pull: {
                    Iphone: { _id: id },
                    Samsung: { _id: id },
                    OnePlus: { _id: id },
                    Vivo: { _id: id },
                    Motorola: { _id: id },
                    IQoo: { _id: id }

                }
            }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).send({ message: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send({ message: 'Server error' });
    }
});


router2.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});



router2.get('/Phone_Detail/:name/:id', async (req, res) => {
    const phone_name = req.params.name;
    // console.log(phone_name)
    try {
        const phoneData = await PhoneData.findOne();
        if (!phoneData) {
            return res.status(404).send({ message: 'Phone data not found' });
        }

        const phoneDetails = phoneData[phone_name];

        if (!phoneDetails) {
            return res.status(404).send({ message: `${phone_name} details not found` });
        }

        return res.status(200).send(phoneDetails);
    } catch (error) {
        console.error('Error fetching phone details:', error);
        return res.status(500).send({ message: 'Server error' });
    }
});



router2.get('/PhoneDataS/:name/:id', async (req, res) => {
    const name = req.params.name;
    const id = req.params.id;
    try {
        const data = await PhoneData.findOne();
        res.json(data[name][id]);
    } catch (error) {
        console.error('Error fetching the data:', error);
        res.status(500).send('Error fetching the data');
    }
});
router2.get('/products/:id/:name', async (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    try {
        const data = await PhoneData.findOne({ [`${name}.${id}`]: { $exists: true } });
        if (!data || !data[name] || !data[name][id]) {
            return res.status(404).send('Product not found');
        }

        const total = data[name][id].Price;
        const discount = total * 7 / 100;
        const cost = total - discount;
        const Title = data[name][id].Title;
        res.json({ total, discount, cost, Title });
    } catch (error) {
        console.error('Error fetching the data:', error);
        res.status(500).send('Error fetching the data');
    }
});
router2.get('/Addcartamount/:amount', async (req, res) => {
    const amount = req.params.amount;
    try {
        const total = amount;
        const discount = total * 7 / 100;
        const cost = total - discount;
        res.json({ total, discount, cost });
    } catch (error) {
        console.error('Error fetching the data:', error);
        res.status(500).send('Error fetching the data');
    }
});
router2.get('/api/items', async (req, res) => {
    try {
        const data = await PhoneData.findOne();
        if (!data) {
            return res.status(404).json({ error: 'Item not found' });
        }
        const Data = [data.Iphone, data.Samsung, data.OnePlus, data.Vivo, data.Motorola, data.IQoo];
        // console.log(Data); 
        res.json(Data);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router2.get('/api/categories', async (req, res) => {
    try {
        const data = [{ name: 'Apple' }, { name: 'Motorola' }, { name: 'OnePlus' }, { name: 'Samsung' }, { name: 'Vivo' }, { name: 'iQOO' }];
        if (!data) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router2.post('/add_cart_product', async (req, res) => {
    try {
        const { name, id, user_id } = req.body;

        const old_data = await PhoneData.findOne({ [`${name}.${id}`]: { $exists: true } });
        if (!old_data || !old_data[name] || !old_data[name][id]) {
            return res.status(404).send('Product not found');
        }

        const item = {
            index: id,
            Product_name: old_data[name][id].Title,
            price: old_data[name][id].Price,
            quantity: 1,
            image: old_data[name][id].image[0]?.img_1 || 'https://example.com/default-image.jpg'
        };

        let userCart = await Cart.findOne({ User_id: user_id });

        if (!userCart) {
            userCart = new Cart({
                User_id: user_id,
                products: [item]
            });
        } else {
            const existingProduct = userCart.products.find(product => String(product.Product_name) === String(old_data[name][id].Title));
            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.price = existingProduct.price + parseFloat(old_data[name][id].Price);
            } else {
                userCart.products.push(item);
            }
        }
        await userCart.save();
        res.status(200).send('Product added to cart successfully');
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Server error');
    }
});

router2.post('/updateCartQuantity', async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ User_id: user_id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        if (cart.products[product_id]) {
            cart.products[product_id].quantity = Math.max(cart.products[product_id].quantity + quantity, 1);
            await cart.save();
            return res.status(200).json({ message: 'Quantity updated successfully', cart });
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router2.post('/removeCartItem', async (req, res) => {
    const { user_id, product_id } = req.body;


    try {
        const cart = await Cart.findOne({ User_id: user_id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }


        if (cart.products[product_id]) {
            const removedProduct = cart.products.splice(product_id, 1)[0];

            cart.totalPrice -= removedProduct.price * removedProduct.quantity;

            await cart.save();

            return res.status(200).json({ message: 'Item removed from cart successfully', cart });
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router2.get('/addcart/:id', async (req, res) => {
    const id = req.params.id;

    try {

        let data = await Cart.findOne({ User_id: id });
        res.json([data]);

    } catch (error) {
        console.error('Error fetching the data:', error);
        res.status(500).send('Error fetching the data');
    }
});

// router2.get('/addcart/:id/:name', async (req, res) => {
//     const id = req.params.id;
//     const name = req.params.name;
//     try {
//         const data = await PhoneData.findOne({ [`${name}.${id}`]: { $exists: true } });
//         if (!data || !data[name] || !data[name][id]) {
//             return res.status(404).send('Product not found');
//         }
//         const item = {
//             id: id,
//             Title: data[name][id].Title,
//             price: data[name][id].Price,
//             quantity: 1,
//             image: data[name][id].image[0].img_1 || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp'
//         };
//         res.json([item]);
//     } catch (error) {
//         console.error('Error fetching the data:', error);
//         res.status(500).send('Error fetching the data');
//     }
// });

module.exports = router2;
