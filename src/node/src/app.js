const express=require('express');
const path = require('path');
const app=express();
const port = process.env.PORT || 4000;
const {router}=require('./router');
const router2=require('./router2');

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({
    origin:'http://localhost:3000'
}));
app.use(bodyParser.json());
app.use(router);
app.use(router2);


app.use('/uploads', express.static(path.join(__dirname, '../uploads/')));
console.log(express.static(path.join(__dirname, '../uploads/')))
app.listen(port,()=>{
    console.log(`connection success fully ${port}`)
})