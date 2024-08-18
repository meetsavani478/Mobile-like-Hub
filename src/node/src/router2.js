const express = require('express');
const nodemailer = require("nodemailer");
const router2=new express.Router();
const bodyParser = require('body-parser');

require('dotenv').config();
require('./db/cun');
const PhoneData = require('./db/Schema3');
const User = require('./db/Schema4');
const list = require('./db/Schema');

router2.use(express.json());
router2.use(express.urlencoded({ extended: true }));
router2.use(bodyParser.json());


router2.post('/IPhone_Data', async (req, res) => {
    try {
        const data = req.body;
      
        const phoneData = await PhoneData.findOneAndUpdate(
            {}, 
            { $push: { Iphone: data.Iphone } },
            { new: true, upsert: true } 
        );
        // console.log(phoneData)
        res.status(202).send(phoneData);
    } catch (e) {
        res.status(404).send(e);
    }
});
router2.post('/SPhone_Data', async (req, res) => {
    try {
        const data = req.body;
      
        const phoneData = await PhoneData.findOneAndUpdate(
            {}, 
            { $push: { Samsung: data.Samsung } },
            { new: true, upsert: true } 
        );
        // console.log(phoneData)
        res.status(202).send(phoneData);
    } catch (e) {
        res.status(404).send(e);
    }
});
router2.post('/VPhone_Data', async (req, res) => {
    try {
        const data = req.body;

        const phoneData = await PhoneData.findOneAndUpdate(
            {}, 
            { $push: { Vivo: data.Vivo } },
            { new: true, upsert: true }
        );
        res.status(202).send(phoneData);
    } catch (e) {
        console.error(e);
        res.status(404).send(e);
    }
});
router2.post('/OPhone_Data', async (req, res) => {
    try {
        const data = req.body;
      
        const phoneData = await PhoneData.findOneAndUpdate(
            {}, 
            { $push: { OnePlus: data.OnePlus } },
            { new: true, upsert: true } 
        );
        // console.log(phoneData)
        res.status(202).send(phoneData);
    } catch (e) {
        res.status(404).send(e);
    }
});
router2.post('/MPhone_Data', async (req, res) => {
    try {
        const data = req.body;
      
        const phoneData = await PhoneData.findOneAndUpdate(
            {}, 
            { $push: { Motorola: data.Motorola } },
            { new: true, upsert: true } 
        );
        // console.log(phoneData)
        res.status(202).send(phoneData);
    } catch (e) {
        res.status(404).send(e);
    }
});
router2.post('/IQPhone_Data', async (req, res) => {
    try {
        const data = req.body;
      
        const phoneData = await PhoneData.findOneAndUpdate(
            {}, 
            { $push: { IQoo: data.IQoo } },
            { new: true, upsert: true } 
        );
        // console.log(phoneData)
        res.status(202).send(phoneData);
    } catch (e) {
        res.status(404).send(e);
    }
});
router2.post('/mycontact', async (req,res)=>{
    const { name,email,subject, message }=req.body;
    try{
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
        from:email,
        to:'mssavani99@gmail.com',
        subject:subject,
        text: `${name}:- ${ message }`,
        html: `<b>${name}:- ${ message }</b>`,
    });
    console.log('Message sent: %s', info.messageId);
    res.status(201).json(true);
    }catch(error){
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
        Email:updateData.email,
    }, {
        new: true
    });
    
      res.json(updatedUser);   
    } catch (err) {
      console.error("Error updating or creating user:", err); 
      res.status(500).send(err); 
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
router2.get('/Phone_Detail/:name/:id',async (req,res)=>{
    const phone_name = req.params.name;
    const phoneData = await PhoneData.findOne();
    return res.status(201).send(phoneData[phone_name]);
})
router2.get('/PhoneDataS/:name/:id', async (req, res) => {
    const name = req.params.name;
    const id= req.params.id;
    try {
        const data = await PhoneData.findOne(); 
        res.json(data[name][id]);
    } catch (error) {
        console.error('Error fetching the data:', error);
        res.status(500).send('Error fetching the data');
    }
});



module.exports = router2;
