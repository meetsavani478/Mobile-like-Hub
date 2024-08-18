const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://meet:8000325808@cluster0.fyojnkt.mongodb.net/').then(()=>{
    console.log("Connection success full");
}).catch((e)=>{
    console.log(e);
})