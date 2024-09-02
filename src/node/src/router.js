const express = require('express');
const jwt = require('jsonwebtoken');
const router = new express.Router();
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
require('dotenv').config();

require('./db/cun');
const list = require('./db/Schema');
const List = require('./db/Schema2')
const User = require('./db/Schema4');


let OTP_1;
let Email_new = '';
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());


// Registration page
router.post('/Registration', async (req, res) => {
    const { Name, Email, Password, PasswordC } = req.body;

    try {
        let old = await list.findOne({ $or: [{ Name }, { Email }] });

        if (old) {
            if (old.Name === Name && old.Email === Email) {
                return res.status(400).json({ error: 'Data already found' });
            } else {
                return res.status(400).json({ error: 'Please enter proper user data' });
            }
        } else {
            if (Password === PasswordC) {
                const hashedPassword = await bcrypt.hash(Password, 12);
                const newUser = new list({
                    Name: Name,
                    Email: Email.toLowerCase(),
                    password: hashedPassword,
                });
                await User.findByIdAndUpdate(newUser._id, {
                    fullName:Name,
                    email:Email.toLowerCase(),
                }, {
                    new: true,
                    upsert: true
                });
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
                    from: 'mssavani99@gmail.com',
                    to: Email,
                    subject: 'Welcome Mail',
                    text: `Thank you for showing your interest in Mobile Like Hub. Your Username is ${Name} and Password is ${Password}`,
                    html: `<b>Thank you for showing your interest in Mobile Like Hub. Your Username is ${Name} and Password is ${Password}</b>`,
                });
                console.log('Message sent: %s', info.messageId);
                await newUser.save();
                return res.status(200).json(true);
            } else {
                return res.status(400).json({ error: 'Passwords do not match' });
            }
        }
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
// login page

router.post('/Login_Data', async (req, res) => {
    try {
        const { Name: user_name, Password: pass } = req.body;

        if (user_name === "Admin" && pass == 5808) {
            console.log("Admin login successful");
            return res.status(200).json({ isAdmin: true });
        }

        const user = await list.findOne({ Name: user_name });
        if (!user) {
            return res.status(404).json({ error: 'Login details are incorrect.' });
        }

      
        const isPassword = await bcrypt.compare(pass, user.password);
        if (isPassword) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ id: `${user._id}`, token, name: `${user.Name}` });
        } else {
            return res.status(404).json({ error: 'Login details are incorrect.' });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'An error occurred during login.' });
    }
});
// user date show page
router.get('/user/:id',verifyToken, async (req, res) => {
    const user=req.user_id;
        const user_data = await User.findOne({ _id: user._id });
        if (!user_data) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user_data.image) {
            const userData = {
                image: user_data.image,
                id: user_data._id,
                username: user_data.fullName,
                email: user_data.email,
                Number: user_data.phoneNumber,
                address: `${user_data.address1} ${user_data.address2}`,
            };
            res.status(201).json(userData);
        } else {
            const userData = {
                image: '-',
                id: user_data._id,
                username: user_data.fullName,
                email: user_data.email,
                Number: user_data.phoneNumber,
                address: `${user_data.address1} ${user_data.address2}`,

            };
            res.status(201).json(userData);
        }

});
//profile update page
router.post('/Profile/:id',verifyToken, async (req, res) => {
        const { Name, Email } = req.body;
        const id = req.params.id;
        try {
           
            const user_data=await list.findByIdAndUpdate(id, {
                Name: Name,
                Email: Email,
            }, {
                new: true
            });
            await User.findByIdAndUpdate(id, {
                email:user_data.Email,
            }, {
                new: true,
                upsert: true
            });
            return res.status(200).json(true);
        } catch (error) {
            res.status(500).json('Internal Server Error');
        }
});
router.get('/Profile/:id',verifyToken, async (req, res) => {

        try {
            const user = await list.findById(req.params.id);
            res.json(user);
        } catch (err) {
            res.status(500).send(err);
        }
});
router.post('/change-password/:id', async (req, res) => {
        const { password } = req.body;
        const id = req.params.id;
        const hashedPassword = await bcrypt.hash(password, 12);
        try {
            const user = await list.findByIdAndUpdate(id, {
                password: hashedPassword
            }, {
                new: true
            });
            return res.status(200).json(true);
        } catch (error) {
            res.status(500).json('Internal Server Error');
        }
});
// OTP page
router.post('/OTP', async (req, res) => {

    try {
        const { Email } = req.body;
        const user = await list.findOne({ Email });
        Email_new = Email;
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        OTP_1 = '';
        const new_otp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        for (let i = 0; i < 4; i++) {
            const j = Math.floor(Math.random() * 10);
            OTP_1 += new_otp[j];
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

        const info = await transporter.sendMail({
            from: 'mssavani99@gmail.com',
            to: Email,
            subject: 'Your OTP',
            text: `Your OTP is: ${OTP_1}`,
            html: `<b>Your OTP is: ${OTP_1}</b>`,
        });

        console.log('Message sent: %s', info.messageId);
        res.status(201).json(true);
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: error.message });
    }

});
// new password page
router.post('/NEW_PASSWORD', async (req, res) => {
    const OTP = await req.body.OTP;
    if (OTP == OTP_1) {
        res.status(201).json(true);
    } else {
        res.status(404).json({ error: "OTP not matched." });
    }
});

// onc more login page and check password
router.post('/New_login', async (req, res) => {
    try {
        const { new_pass, new_pass_1 } = req.body;


        if (new_pass !== new_pass_1) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const new_bcrypt = await bcrypt.hash(new_pass, 10);

        const updatedUser = await list.findOneAndUpdate(
            { Email: Email_new },
            { password: new_bcrypt },
            { new: true }
        );

        if (updatedUser) {
            res.status(200).json(true);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: "Server error" });
    }
});

//file upload method
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        const videoMimeTypes = ['video/mp4', 'video/mpeg'];
        const fileSize = parseInt(req.headers['content-length']);
        const fileMimeType = file.mimetype.toLowerCase();

        if (imageMimeTypes.includes(fileMimeType) && fileSize <= 30 * 1024 * 1024) {
            cb(null, true);
        } else if (videoMimeTypes.includes(fileMimeType) && fileSize <= 100 * 1024 * 1024) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type or size. Images must be less than 30MB and videos less than 100MB.'));
        }
    }
});

router.post('/file_upload/:id', upload.single('profileImage'), async (req, res) => {
    try {
        const isLoggedIn = true;
        if (isLoggedIn) {
            const id = req.params.id;

            const imageData = await User.findByIdAndUpdate(id, {
                image: req.file.path,
            }, {
                new: true,
            });
            if (imageData && imageData.image) {
                res.status(200).json(true);
            } else {
                res.status(404).json({ error: 'Contact Data Not Found' });
            }
        } else {
            res.status(401).json({ error: "Please login" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
});

router.get('/Product/:id', async (req, res) => {
    const Data = await List.find();
        res.status(202).send(Data);
})
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const tokenWithoutBearer = token.split(' ')[1] || token;        
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user_id = decoded;       
        next();
        // return res.status(201).json(req.user_id);
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ message: 'Token is not valid' });
    }
}
module.exports = { router };