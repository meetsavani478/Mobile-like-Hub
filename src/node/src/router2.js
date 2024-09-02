const express = require('express');
const nodemailer = require("nodemailer");
const router2 = new express.Router();
const bodyParser = require('body-parser');

require('dotenv').config();
require('./db/cun');
const PhoneData = require('./db/Schema3');
const User = require('./db/Schema4');
const list = require('./db/Schema');

router2.use(express.json());
router2.use(express.urlencoded({ extended: true }));
router2.use(bodyParser.json());

router2.post('/phondata/:category', async (req, res) => {
    const category = req.params.category;
    console.log('Category:', category);
   
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

        console.log(phoneData);

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


router2.put('/api/items/:id', async (req, res) => {
    const id = req.params.id;
    const { Title, Price, image } = req.body;

    const updatedImage = Array.isArray(image) ? image[0].img_1 : image;

    try {
        const updateResult = await PhoneData.updateOne(
            { $or: [
                { 'Iphone._id': id },
                { 'Samsung._id': id },
                { 'OnePlus._id': id },
                { 'Vivo._id': id },
                { 'Motorola._id': id }
            ] },
            { $set: {
                'Iphone.$[elem].Title': Title,
                'Iphone.$[elem].Price': Price,
                'Iphone.$[elem].image.0.img_1': updatedImage,
                'Samsung.$[elem].Title': Title,
                'Samsung.$[elem].Price': Price,
                'Samsung.$[elem].image.0.img_1': updatedImage,
                'OnePlus.$[elem].Title': Title,
                'OnePlus.$[elem].Price': Price,
                'OnePlus.$[elem].image.0.img_1': updatedImage,
                'Vivo.$[elem].Title': Title,
                'Vivo.$[elem].Price': Price,
                'Vivo.$[elem].image.0.img_1': updatedImage,
                'Motorola.$[elem].Title': Title,
                'Motorola.$[elem].Price': Price,
                'Motorola.$[elem].image.0.img_1': updatedImage
            }},
            {
                arrayFilters: [{ 'elem._id': id }],
                multi: true
            }
        );

        if (updateResult.nModified === 0) {
            return res.status(404).send({ message: 'Item not found in any category' });
        }
        res.json({ message: 'Item updated successfully', updatedItem: { id, Title, Price, image: updatedImage } });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send({ message: 'Server error' });
    }
});


router2.delete('/api/items/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const result = await PhoneData.updateOne(
            { 
                $or: [
                    { 'Iphone._id': id },
                    { 'Samsung._id': id },
                    { 'OnePlus._id': id },
                    { 'Vivo._id': id },
                    { 'Motorola._id': id }
                ]
            },
            { $pull: {
                Iphone: { _id: id },
                Samsung: { _id: id },
                OnePlus: { _id: id },
                Vivo: { _id: id },
                Motorola: { _id: id }
            } }
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
    console.log(phone_name)
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
        res.json({ total, discount, cost });
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
        const Data = [data.Iphone, data.Samsung, data.OnePlus, data.Vivo, data.Motorola];
        // console.log(Data); 
        res.json(Data);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router2.get('/addcart/:id/:name', async (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    try {
        const data = await PhoneData.findOne({ [`${name}.${id}`]: { $exists: true } });
        if (!data || !data[name] || !data[name][id]) {
            return res.status(404).send('Product not found');
        }
        // console.log(data[name][id])
        const item = {
            id: id,
            Title: data[name][id].Title,
            price: data[name][id].Price,
            quantity: 1,
            image: data[name][id].image[0].img_1 || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp'
        };
        res.json([item]);
    } catch (error) {
        console.error('Error fetching the data:', error);
        res.status(500).send('Error fetching the data');
    }
});

module.exports = router2;
