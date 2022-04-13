const express = require('express');
// รวมbodyทั้งหมด มันไม่สามารถ ส่งข้อมูลไปเป็นก้อนได้ เลยใช้ body-parser
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter=require('./routes/user');

const app = express();


app.use(bodyParser.json());
app.use(
    cors({
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  );
app.use('/users',userRouter)


const boot =async()=>{
    //connect to mongodb
    const uri='mongodb+srv://santa:santa@santacluster.y2mxq.mongodb.net/santa?retryWrites=true&w=majority';
    await mongoose.connect(uri);
    //start express server
app.listen(7000,()=>{
    console.log('server is running on port 7000');
});

};

boot();

app.use((req,res,next)=>{
    next(createError(404)); 
});

app.use(function(err,req,res,next){
  console.error(err.message);
  if(!err.statusCode)
      err.statusCode=500;
  res.status(err.statusCode).send(err.message);
})