const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const playlist=mongoose.Schema({
    Name:{
        type:String,
        require:true,
        using:true,
       
    },
    Email:{
        type:String,
        require:true,
        using:true,
    },
    password:{   
        type:String,
        require:true,
        using:true,
        
    },
    password_C:{
        type:String,
        require:true,
        using:true,
    },
    author: {
        type:String,
        require:true,
        using:true, 
    }
})

const list = mongoose.model('playlist',playlist);
module.exports=list