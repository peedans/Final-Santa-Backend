// เป็น framework ของ node js เกี่ยวกับserver
const express = require('express');
// รวมbodyทั้งหมด มันไม่สามารถ ส่งข้อมูลไปเป็นก้อนได้ เลยใช้ body-parser
// รับส่งข้อมูล clinet กับ server
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// จัดการเกี่ยว กับ api
const cors = require('cors');
const morgan =require('morgan');
// เอาไว้เก็บข้อมูลต่างๆๆ
require('dotenv').config();
// คือการอ่าน Directory ใน Folder routes อัตโนมัติ
const { readdirSync } = require('fs');
const userRouter=require('./routes/user');


// ประกาศตัวแปร app
const app = express();
//middleware
// morgan ว่ามีใครทำ api ของเรา
app.use(morgan('dev'));

// เป็นตัวจัดการกับ req หน้าบ้านที่ส่งมาหลังบ้าน
// limit ถ้าไม่ได้กำหมด หรือกำหนดน้อยไป เวลาเรามี req ข้อมูลมาเยอะ serverจะไม่ยอม
app.use(bodyParser.json({limit:'20mb'}));

// การดึงapi จากเว็บนอก
app.use(
    cors({
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  );
app.use('/users',userRouter)

//Route
// http://localhost:7000/login/
//เรียกใช้งาน route login
// วิธี ที่1
app.use('/api',require('./routes/api'));


//วิธีที่2
// readdirSync('./routes').map((r)=>console.log(r));


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


